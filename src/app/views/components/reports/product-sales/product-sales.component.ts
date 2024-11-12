import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './product-sales.component.html',
    providers: [MessageService]
})
export class ProductSalesComponent implements OnInit {

    suppliersDialog: boolean = false;
    
    cratesDialog: boolean = false;

    supplier: any = {};

    selectedSuppliers: any[]

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    amount: any;

    suppliers: any[] ;

    paymentMode: any;
    crates: any;

    regType: { label: string; value: string; }[];
    salesType: { label: string; value: string; }[];
    paymentModes: { label: string; value: string; }[];

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {

        this.loadSuppliers();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Tel' },
            { field: 'email', header: 'email' },
            { field: 'cumulativeAmountToPay', header: 'cumulativeAmountToPay' },
            { field: 'cumulativeAmountPaid', header: 'cumulativeAmountPaid' },
            { field: 'cumulativeAmountBalance', header: 'cumulativeAmountBalance' },
            { field: 'cumulativeCratesOut', header: 'cumulativeCratesOut' },
            { field: 'cumulativeCratesIn', header: 'cumulativeCratesIn' },
            { field: 'cumulativeCratesBalance', header: 'cumulativeCratesBalance' }
        ];
        this.paymentModes = [
            { label: 'CASH', value: 'CASH' },
            { label: 'MPESA', value: 'MPESA' },
            { label: 'BANK', value: 'BANK' },
        ];

    }
    hideDialog() {
        this.suppliersDialog = false;
    }
    hideCratesDialog(){
        this.cratesDialog = false;
    }

    editSupplier(supplier: any) {
        this.supplier = { ...supplier };
        this.suppliersDialog = true;
    }
    editCrates(supplier: any) {
        this.supplier = { ...supplier };
        this.cratesDialog = true;
    }

    payDebt() {
        
            if (this.supplier.supplierID) {
                const updatePayload = {
                    payerID : this.supplier.supplierID,
                    amount: parseFloat(this.amount)
                };
                this.apiService.createSupplierPayment(updatePayload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadSuppliers();
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
        this.suppliersDialog = false;
        this.supplier = {};
        this.amount=null;
    }

    returnCrates() {
        
        if (this.supplier.supplierID) {
            const updatePayload = {
                supplierID : this.supplier.supplierID,
                crates: this.crates
            };
            this.apiService.returnSupplierCrates(updatePayload).subscribe(
                (result: any) => {
                    if (result.success === true) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: result.message,
                        });
                        this.loadSuppliers();
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
    this.cratesDialog = false;
    this.supplier = {};
    this.crates=null;
}

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    loadSuppliers() {
        this.apiService.getSuppliers().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.error.message,
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

    
}
