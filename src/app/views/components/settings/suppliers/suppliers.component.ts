import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './suppliers.component.html',
    providers: [MessageService]
})
export class SuppliersComponent implements OnInit {

    supplierDialog: boolean = false;

    supplier: any = {};

    selectedSupplier: any[]

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    suppliers : any[];

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {

        this.loadSuppliers();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'alternativeContact', header: 'Alternative contact' },
            { field: 'physicalAddress', header: 'Physical Address' },
        ];

    }

    openNew() {
        this.supplier = {};
        this.submitted = false;
        this.supplierDialog = true;
    }

    hideDialog() {
        this.supplierDialog = false;
    }

    editSupplier(supplier: any) {
        this.supplier = { ...supplier };
        this.supplierDialog = true;
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

    saveSupplier() {
        this.submitted = true;

        if (this.supplier.name?.trim()&&this.supplier.phone?.trim()&&this.supplier.alternativeContact?.trim()&&this.supplier.physicalAddress?.trim()) {
            const payload = {
                name: this.supplier.name,
                phone: this.supplier.phone,
                alternativeContact: this.supplier.alternativeContact,
                physicalAddress: this.supplier.physicalAddress,
            };
            if (this.supplier.supplierID) {
                const updatePayload = this.supplier;
                this.apiService.updatesupplier(updatePayload).subscribe(
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
            } else {
                this.apiService.createSupplier(payload).subscribe(
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
        }
        this.supplierDialog = false;
        this.supplier = {};
    }


}
