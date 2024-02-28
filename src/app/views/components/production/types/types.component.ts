import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './types.component.html',
    providers: [MessageService],
})
export class TypesComponent implements OnInit {
    productDialog: boolean = false;

    product: any = {};

    selectedProduct: any[];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    products: any[];

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadProducts();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'metric', header: 'Metric' },
            { field: 'unitPrice', header: 'Unit price' },
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
    }

    editProduct(product: any) {
        this.product = { ...product };
        this.productDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    loadProducts() {
        this.apiService.getProducts().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.products = data.data;
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

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim() && this.product.metric?.trim()) {
            const payload = {
                name: this.product.name.toUpperCase(),
                metric: this.product.metric,
                unitPrice: this.product.unitPrice,
                reorderPoint: this.product.reorderPoint,
                reorderQuantity: this.product.reorderQuantity,
                remainingQuantity: 0,
            };
            if (this.product.productID) {
                const updatePayload = this.product;
                this.apiService.updateProduct(updatePayload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadProducts();
                            this.productDialog = false;
                            this.product = {};
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
                this.apiService.createProduct(payload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadProducts();
                            this.productDialog = false;
                            this.product = {};
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
}
