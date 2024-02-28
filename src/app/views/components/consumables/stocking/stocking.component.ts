import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './stocking.component.html',
    providers: [MessageService],
})
export class StockingComponent implements OnInit {
    materialStockDialog: boolean = false;

    materialStock: any = {};

    selectedMaterialStock: any[];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    materialStocks: any[];

    materials: any;

    suppliers: any[];

    initialQuantity: any;

    totalPrice: any;

    metric: string = '';

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadMaterials();

        this.loadSuppliers();

        this.loadMaterialStocks();

        this.cols = [
            { field: 'material.name', header: 'Material' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'supplier.name', header: 'Supplier' },
            { field: 'purchaseDate', header: 'Purchase Date' },
            { field: 'description', header: 'Description' },
        ];
    }

    openNew() {
        this.materialStock = {};
        this.submitted = false;
        this.materialStockDialog = true;
    }

    hideDialog() {
        this.materialStockDialog = false;
    }

    editMaterialStock(materialStock: any) {
        this.materialStock = { ...materialStock };
        this.materialStockDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    loadMaterials() {
        this.apiService.getMaterials().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.materials = data.data;
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.error.message,
                    life: 3000,
                });
            }
        );
    }

    loadSuppliers() {
        this.apiService.getSuppliers().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.suppliers = data.data;
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.error.message,
                    life: 3000,
                });
            }
        );
    }

    loadMaterialStocks() {
        this.apiService.getMaterialStocks().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.materialStocks = data.data;
                this.initialQuantity = data.data;
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.error.message,
                    life: 3000,
                });
            }
        );
    }

    saveMaterialStock() {
        this.submitted = true;

        if (this.materialStock.description?.trim()) {
            const payload = {
                quantity: this.materialStock.quantity,
                material: this.materialStock.material,
                supplier: this.materialStock.supplier,
                description: this.materialStock.description,
            };
            if (this.materialStock.materialStockID) {
                const previousQuantity = this.initialQuantity.find(
                    (obj) =>
                        obj.materialStockID ==
                        this.materialStock.materialStockID
                );
                const updatePayload = {
                    materialStockID: this.materialStock.materialStockID,
                    initialQuantity: previousQuantity.quantity,
                    updatedQuantity: this.materialStock.quantity,
                    material: this.materialStock.material,
                    supplier: this.materialStock.supplier,
                    description: this.materialStock.description,
                    purchaseDate: this.materialStock.purchaseDate,
                    user: this.materialStock.user,
                };
                this.apiService.updatematerialStock(updatePayload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadMaterialStocks();
                            this.materialStockDialog = false;
                            this.materialStock = {};
                        }
                    },
                    (error) => {
                        console.error(error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: error.error.message,
                        });
                    }
                );
            } else {
                this.apiService.creatematerialStock(payload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadMaterialStocks();
                            this.materialStockDialog = false;
                            this.materialStock = {};
                        }
                    },
                    (error) => {
                        console.error(error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: error.error.message,
                        });
                    }
                );
            }
        }
    }
    calculatePrice() {
        this.totalPrice =
            this.materialStock.material.unitPrice * this.materialStock.quantity;
        this.metric = this.materialStock.material.metric;
    }
}
