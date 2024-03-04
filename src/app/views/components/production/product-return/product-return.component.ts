import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { co } from '@fullcalendar/core/internal-common';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
    templateUrl: './product-return.component.html',
    providers: [MessageService],
})
export class ProductReturnComponent implements OnInit {
    productDispatchDialog: boolean = false;

    code: any;

    showCode: boolean = false;

    metric: string = '';

    productDispatch: any = {};

    selectedproductDispatch: any[];

    selectedReturnedProduct: any;

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    productDispatches: any[];

    products: any;

    suppliers: any[];

    initialQuantity: any;

    totalPrice: any;

    paymentModes: { label: string; value: string }[];
    selectedDispatchedProducts: any;
    product: any;
    remainingstock: any;
    clients: any;
    vehicle: any;
    fuel: any;
    cratesOut: any;
    dispatchedProducts: any;
    agentName: any;
    total: number = 0;

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadproducts();

        this.loadClients();

        this.loadDispatchedProducts();

        this.cols = [
            // { field: 'product.name', header: 'product' },
            { field: 'code', header: 'Code' },
            { field: 'product.totalPrice', header: 'Total Price' },
            { field: 'shift', header: 'Shift' },
            { field: 'dispatchDate', header: 'Dispatch Date' },
            { field: 'description', header: 'Description' },
        ];

        this.paymentModes = [
            { label: 'CASH', value: 'CASH' },
            { label: 'MPESA', value: 'MPESA' },
            { label: 'BANK', value: 'BANK' },
        ];
    }

    openNew() {
        // this.productDispatch = {};
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

    loadDispatchedProducts() {
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
                this.dispatchedProducts = data.data;
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
                this.products = data.data.map((product: any) => {
                    return {
                        ...product,
                        quantity: 0,
                    };
                });
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

    loadClients() {
        this.apiService.getClients().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.clients = data.data;
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

    dispatchedProductChange(prod: any){
        this.total = 0;
        for (let prod of this.selectedReturnedProduct.dispatchedProducts) {
            console.log(prod)
            this.total = this.total + prod.salesPrice;
        }
    }

    saveproductDispatch() {
        this.submitted = true;
        this.agentName = this.productDispatch.client.name;
        if (this.fuel?.trim()) {
            const payload = {
                dispatchedProducts: this.selectedDispatchedProducts,
                client: this.productDispatch.client,
                cratesOut: this.cratesOut,
                vehicle: this.vehicle,
                fuelIssued: this.fuel,
            };

            this.apiService.createProductdispatch(payload).subscribe(
                (result: any) => {
                    if (result.success === true) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: result.message,
                        });
                        this.code = result.data;
                        this.showCode = true;
                        this.loadDispatchedProducts();
                        this.loadproducts();
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
    calculatePrice(product: any) {
        let returned = (product.returnedQuantity + product.returnedSpoiled);
        if(returned>product.quantity){
            returned = product.quantity;
            product.salesPrice = 0;
        }
        product.soldQuantity = product.quantity - returned;
        product.salesPrice = product.unitPrice * product.soldQuantity;
        this.calculateSalesTotal()
    }
    
    calculateSalesTotal() {
        this.total = 0;

            for (let prod of this.selectedReturnedProduct.dispatchedProducts) {
                if(prod.salesPrice==null){
                    prod.salesPrice = 0;
                }
                this.total += prod.salesPrice;
            }
        

    }
}
