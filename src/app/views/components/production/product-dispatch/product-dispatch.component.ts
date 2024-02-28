import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './product-dispatch.component.html',
    providers: [MessageService]
})
export class ProductDispatchComponent implements OnInit {

    productDispatchDialog: boolean = false;

    metric: string = '';

    productDispatch: any = {};

    selectedproductDispatch: any[];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    productDispatches: any[];

    products: any;

    suppliers: any[];

    initialQuantity: any;

    totalPrice: any;

    shifts: { label: string; value: string }[];

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadproducts();

        this.loadproductDispatch();

        this.cols = [
            { field: 'product.name', header: 'product' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'product.totalPrice', header: 'Total Price' },
            { field: 'shift', header: 'Shift' },
            { field: 'dispatchDate', header: 'Dispatch Date' },
            { field: 'description', header: 'Description' },
        ];

        this.shifts = [
            { label: 'DAY', value: 'DAY' },
            { label: 'NIGHT', value: 'NIGHT' },
        ];
    }

    openNew() {
        this.productDispatch = {};
        this.submitted = false;
        this.productDispatchDialog = true;
    }

    hideDialog() {
        this.productDispatchDialog = false;
    }

    editproductDispatch(productDispatch: any) {
        this.productDispatch = { ...productDispatch };
        this.productDispatchDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    loadproducts() {
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

    loadproductDispatch() {
        this.apiService.getProductDispatch().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.productDispatches = data.data;
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

    saveproductDispatch() {
        this.submitted = true;

        if (this.productDispatch.description?.trim()) {
            const payload = {
                initialQuantity: this.productDispatch.quantity,
                product: this.productDispatch.product,
                shift: this.productDispatch.shift,
                description: this.productDispatch.description,
            };
            
                this.apiService.createProductdispatch(payload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadproductDispatch();
                            this.productDispatchDialog = false;
                            this.productDispatch = {};
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
            this.productDispatch.product.unitPrice *
            this.productDispatch.quantity;
        this.metric = this.productDispatch.product.metric;
    }
}
