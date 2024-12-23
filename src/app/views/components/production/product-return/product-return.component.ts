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
    styles: [`
        .overdue {
            font-weight: 700;
            color: #FF5252;
            text-decoration: line-through;
        }
        .almost {
            font-weight: 700;
            color: #FFA726;
        }
        .notover {
            font-weight: 700;
            color: #66BB6A;
        }

        :host ::ng-deep .row-accessories {
            background-color: rgba(0,0,0,.15) !important;
        }
    `
    ]
})
export class ProductReturnComponent implements OnInit {
    productDispatchDialog: boolean = false;

    productDispatchDialog1: boolean = false;

    productDispatchDialog2: boolean = false;

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
    client: any;
    vehicle: any;
    fuel: any;
    cratesOut: any;
    dispatchedProducts: any;
    agentName: any;
    total: number = 0;
    cratesIn: any;
    paymentMode: any;
    balance: any;
    amount: any;
    dispatchedReturnProducts: any;
    startDate: string = "";
    endDate: string = "";
    display: boolean = false;
    selectedClients: any = [];

    showDialog() {
        this.display = true;
    }


    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {

        this.loadDispatchedProductsReturn();

        this.loadDispatchedProducts();

        this.loadClients();

        console.log(this.clients);

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

    hideDialog2() {
        this.productDispatchDialog2 = false;
    }

    proceedToClients(){
        this.selectedClients
        this.productDispatchDialog =false;
        this.productDispatchDialog1 = true;
    }
    backToDialog1(){
        this.productDispatchDialog1 = false;
        this.productDispatchDialog = true;
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
    loadDispatchedProductsReturn() {
        this.apiService.getProductDispatchReturn(this.startDate,this.endDate).subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.dispatchedReturnProducts = data.data;
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

    onFromDate(value: Date){
        this.startDate = value.toISOString().slice(0,-1);
        this.loadDispatchedProductsReturn();
      }
      onToDate(value: Date){
        this.endDate = value.toISOString().slice(0,-1);
        this.loadDispatchedProductsReturn();
      }

    dispatchedProductChange(prod: any){
        this.selectedDispatchedProducts = this.selectedReturnedProduct.dispatchedProducts;
        this.clients.forEach(client => {
            client.dispatchedProducts = this.selectedDispatchedProducts.map(product => ({
                ...product, // Copy each product
                deliveredQuantity: 0, // Initialize additional fields
                deliveredProductPrice: 0,
                clientDeliveredProductPrice: 0,
                clientAmount: 0
            }));
        });
        console.log(this.clients)
        console.log(this.selectedDispatchedProducts);
        this.total = 0;
        this.balance = 0;
        this.amount = 0;
        for (let prod of this.selectedReturnedProduct.dispatchedProducts) {
            this.total = this.total + prod.salesPrice;
        }
    }

    saveDispatchToClients(){
        console.log(this.selectedClients);
        this.submitted = true;
        this.apiService.createClientDispatchReturn(this.selectedClients).subscribe(
            (result: any) => {
                if (result.success === true) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.code = result.data;
                    this.showCode = true;
                    this.loadDispatchedProductsReturn();
                    this.loadDispatchedProducts();
                    this.loadClients();
                    this.productDispatchDialog1 = false;
                    this.productDispatchDialog2 = true;
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

    saveProductDispatchReturn() {
        this.submitted = true;
        
            const payload = {
                dispatchedProducts: this.selectedDispatchedProducts,
                productDispatchCode: this.selectedReturnedProduct.productDispatchCode,
                cratesIn: this.cratesIn,
                paymentMode: this.paymentMode.value,
                balance: this.balance,
                amountPaid: this.amount,
                totalSalesPrice: this.total,
            };
            this.apiService.createProductdispatchReturn(payload).subscribe(
                (result: any) => {
                    if (result.success === true) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: result.message,
                        });
                        this.code = result.data;
                        this.showCode = true;
                        this.loadDispatchedProductsReturn();
                        this.productDispatchDialog2 = false;
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
    calculateDeliveryPrice(product: any){
        product.deliveredProductPrice = product.price * product.deliveredQuantity;
        product.clientDeliveredProductPrice = product.clientAmount * product.deliveredQuantity;
    }
    calculatePrice(product: any) {
        let returned = (product.returnedQuantity + product.returnedSpoiled);
        if(product.returnedQuantity>product.quantity){
            product.returnedQuantity = product.quantity;
            product.returnedSpoiled = 0;
            product.salesPrice = 0;
        }
        if(product.returnedSpoiled > product.quantity){
            product.returnedSpoiled = product.quantity;
            product.returnedQuantity = 0;
            product.salesPrice = 0;
        }
        if(returned>product.quantity){
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Reset! Enter valid quantities!",
            });
            product.returnedQuantity = 0;
            product.returnedSpoiled = 0;
            returned= 0;
        }
        product.soldQuantity = product.quantity - returned;
        product.salesPrice = product.price * product.soldQuantity;
        this.calculateSalesTotal()
        this.calculateBalance();
    }
    
    calculateSalesTotal() {
        this.total = 0;

            for (let prod of this.selectedReturnedProduct.dispatchedProducts) {
                if(prod.salesPrice==null){
                    prod.salesPrice = 0;
                }
                this.total += prod.salesPrice;
            }
            this.calculateBalance();
        

    }
    calculateBalance(){
        this.balance = this.total - this.amount;
    }
}
