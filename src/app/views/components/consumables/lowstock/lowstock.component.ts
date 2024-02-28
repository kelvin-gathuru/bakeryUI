import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './lowstock.component.html',
    providers: [MessageService],
})
export class LowstockComponent implements OnInit {
    materialStockDialog: boolean = false;

    material: any = {};

    materials: any;

    selectedMaterial: any[];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    suppliers: any;
    totalPrice: number;

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadMaterials();

        this.loadSuppliers();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'metric', header: 'Metric' },
            { field: 'unitPrice', header: 'Unit price' },
            { field: 'reorderQuantity', header: 'Reorder Quantity' },
            { field: 'reorderPoint', header: 'reorder Point' },
        ];
    }

    openNew() {
        this.material = {};
        this.submitted = false;
        this.materialStockDialog = true;
    }

    hideDialog() {
        this.materialStockDialog = false;
    }

    stockMaterial(material: any) {
        this.material = { ...material };
        this.calculatePrice();
        this.materialStockDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    loadMaterials() {
        this.apiService.getMaterialsLowOnStock().subscribe(
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
    saveMaterialStock() {
        this.submitted = true;

        if (this.material.description?.trim()) {
            const payload = {
                quantity: this.material.reorderQuantity,
                material: this.material,
                supplier: this.material.supplier,
                description: this.material.description,
            };
            this.apiService.creatematerialStock(payload).subscribe(
                (result: any) => {
                    if (result.success === true) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: result.message,
                        });
                        this.loadMaterials();
                        this.materialStockDialog = false;
                        this.materials = {};
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

    calculatePrice() {
        this.totalPrice =
            this.material.unitPrice * this.material.reorderQuantity;
    }
}
