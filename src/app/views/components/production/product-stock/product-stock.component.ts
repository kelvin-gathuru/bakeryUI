import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './product-stock.component.html',
    providers: [MessageService]
})
export class ProductStockComponent implements OnInit {

    productStockDialog: boolean = false;

    productStock: any = {};

    selectedProductStock: any[];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    productStocks: any[];

    products: any;

    initialQuantity: any;

    totalPrice: any;

    metric: string = '';

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadProducts();

        this.loadProductStocks();

        this.cols = [
            { field: 'product.name', header: 'product' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'spoiledAtProduction', header: 'Spoiled At Production' },
            { field: 'spoiledAtPackaging', header: 'Spoiled At Packaging' },
            { field: 'stockDate', header: 'Stock Date' },
            { field: 'description', header: 'Description' },
        ];
    }

    openNew() {
        this.productStock = {};
        this.submitted = false;
        this.productStockDialog = true;
    }

    hideDialog() {
        this.productStockDialog = false;
    }

    editProductStock(productStock: any) {
        this.productStock = { ...productStock };
        this.productStockDialog = true;
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

    loadProductStocks() {
        this.apiService.getProductStock().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.productStocks = data.data;
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

    saveProductStock() {
        this.submitted = true;

        if (this.productStock.description?.trim()) {
            const payload = {
                quantity: this.productStock.quantity,
                product: this.productStock.product,
                spoiledAtProduction: this.productStock.spoiledAtProduction,
                spoiledAtPackaging: this.productStock.spoiledAtPackaging,
                description: this.productStock.description,
            };
            if (this.productStock.productStockID) {
                const previousQuantity = this.initialQuantity.find(
                    (obj) =>
                        obj.productStockID ==
                        this.productStock.productStockID
                );
                const updatePayload = {
                    productStockID: this.productStock.productStockID,
                    initialQuantity: previousQuantity.quantity,
                    updatedQuantity: this.productStock.quantity,
                    product: this.productStock.product,
                    spoiledAtProduction: this.productStock.spoiledAtProduction,
                    spoiledAtPackaging: this.productStock.spoiledAtPackaging,
                    description: this.productStock.description,
                    purchaseDate: this.productStock.purchaseDate,
                    user: this.productStock.user,
                };
                this.apiService.updateProductStock(updatePayload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadProductStocks();
                            this.productStockDialog = false;
                            this.productStock = {};
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
                this.apiService.createProductStock(payload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadProductStocks();
                            this.productStockDialog = false;
                            this.productStock = {};
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
            this.productStock.product.unitPrice * this.productStock.quantity;
        this.metric = this.productStock.product.metric;
    }
}
