import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './clients.component.html',
    providers: [MessageService],
})
export class ClientsComponent implements OnInit {
    clientsDialog: boolean = false;

    client: any = {};

    selectedClients: any[];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    clients: any[];

    regions: any[];

    deleteClientDialog: boolean = false;

    regType: { label: string; value: string }[];

    salesType: { label: string; value: string }[];

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadClients();

        this.loadRegions();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Phone' },
            { field: 'salesType', header: 'Sales Type' },
            { field: 'registrationType', header: 'Registration Type' },
            { field: 'region.name', header: 'Region' },
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'ACTIVE' },
            { label: 'INACTIVE', value: 'ACTIVE' },
        ];

        this.regType = [
            { label: 'CLIENT', value: 'CLIENT' },
            { label: 'SALES AGENT', value: 'SALES_AGENT' },
        ];

        this.salesType = [
            { label: 'BULK', value: 'BULK' },
            { label: 'RETAIL', value: 'RETAIL' },
        ];
    }

    openNew() {
        this.client = {};
        this.submitted = false;
        this.clientsDialog = true;
    }

    hideDialog() {
        this.clientsDialog = false;
    }

    editClient(client: any) {
        this.client = { ...client };
        this.clientsDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    loadClients() {
        this.apiService.getClients().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.error.message,
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
    loadRegions() {
        this.apiService.getRegions().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.regions = data.data;
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
    saveClient() {
        this.submitted = true;

        if (this.client.name?.trim() && this.client.phone?.trim()) {
            const payload = {
                name: this.client.name,
                email: this.client.email,
                phone: this.client.phone,
                salesType: this.client.salesType,
                status: this.client.status,
                registrationType: this.client.registrationType,
                regionID: this.client.region.regionID,
            };
            if (this.client.clientID) {
                const updatePayload = this.client;
                this.apiService.updateClient(updatePayload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadClients();

                            this.clientsDialog = false;
                            this.client = {};
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
                this.apiService.createClient(payload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadClients();

                            this.clientsDialog = false;
                            this.client = {};
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

    deleteClient(client: any) {
        this.deleteClientDialog = true;
        this.client = { ...client };
    }

    confirmDelete() {
        this.apiService.deleteClient(this.client).subscribe(
            (result: any) => {
                if (result.success === true) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.loadClients();
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
        this.client = {};
        this.deleteClientDialog = false;
    }
}
