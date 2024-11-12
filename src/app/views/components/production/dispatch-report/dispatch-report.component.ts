import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './dispatch-report.component.html',
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
export class DispatchReportComponent implements OnInit {

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
    cratesIn: any;
    paymentMode: any;
    balance: any;
    amount: any;
    dispatchedReturnProducts: any;
    groupedData = [];

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {

        this.LoadProductDispatchForClient();

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
    calculateClientTotal(client: any): number {
        return client.products.reduce((total, product) => total + product.deliveredProductPrice, 0);
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

    LoadProductDispatchForClient() {
        this.apiService.getProductDispatchForClient().subscribe(
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

    calculateSalesTotal() {
        this.total = 0;

            for (let prod of this.dispatchedReturnProducts) {
                if(prod.amountPaid==null){
                    prod.amountPaid = 0;
                }
                this.total += prod.amountPaid;
            }

    }
      
}
