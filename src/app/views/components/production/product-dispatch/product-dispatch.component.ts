import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
    templateUrl: './product-dispatch.component.html',
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
export class ProductDispatchComponent implements OnInit {
    productDispatchDialog: boolean = false;

    code: any;

    showCode: boolean = false;

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
    selectedDispatchedProducts: any;
    product: any;
    remainingstock: any;
    clients: any;
    vehicle: any;
    fuel: any;
    cratesOut: any;
    dispatchedProducts: any;
    agentName: any;

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

        this.shifts = [
            { label: 'DAY', value: 'DAY' },
            { label: 'NIGHT', value: 'NIGHT' },
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
        product.totalPrice = product.unitPrice * product.quantity;
        product.remainingStock = product.remainingQuantity - product.quantity;
        if(product.remainingStock<0){
            product.quantity = product.remainingQuantity;
            product.remainingStock = 0;
            product.totalPrice = product.unitPrice * product.quantity;
        }
    }
    generatePDF(){
        const now = new Date();
        let docDefinition = {
            header: { text: 'Name: '+ this.agentName, fontSize: 5 },
            footer: { text: 'Date: '+ now, fontSize: 5 },
            pageSize: 'A8',
            pageOrientation: 'landscape',
            content: [
                { text: this.code, fontSize: 20 },
              ]
        };
        pdfMake.createPdf(docDefinition).download();
        this.showCode = false;
    }
}
