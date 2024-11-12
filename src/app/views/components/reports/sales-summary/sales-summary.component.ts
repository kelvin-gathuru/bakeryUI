import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './sales-summary.component.html',
    providers: [MessageService]
})
export class SalesSummaryComponent implements OnInit {

    clientsDialog: boolean = false;

    client: any = {};

    selectedClients: any[]

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    clients: any[];

    regions: any[] ;

    regType: { label: string; value: string; }[];
    salesType: { label: string; value: string; }[];
    paymentModes: { label: string; value: string; }[];
    amount: any;
    paymentMode: string | null;

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {

        this.loadClients();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'phone', header: 'Tel' },
            { field: 'email', header: 'email' },
            { field: 'cumulativeAmountToPay', header: 'cumulativeAmountToPay' },
            { field: 'cumulativeAmountPaid', header: 'cumulativeAmountPaid' },
            { field: 'cumulativeAmountBalance', header: 'cumulativeAmountBalance' }
        ];

        this.paymentModes = [
          { label: 'CASH', value: 'CASH' },
          { label: 'MPESA', value: 'MPESA' },
          { label: 'BANK', value: 'BANK' },
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
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

      loadClients() {
        this.apiService.getClients().subscribe(
          (data: any) => {
            if(data.success==false){
              this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
            }
            this.clients = data.data;
          },
          (error) => {
            console.error('Error fetching regions data:', error);
          }
        );
      }

      payDebt() {
        
        if (this.client.clientID) {
            const updatePayload = {
                payerID : this.client.clientID,
                amount: parseFloat(this.amount)
            };
            this.apiService.createClientPayment(updatePayload).subscribe(
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
    }
    this.clientsDialog = false;
    this.client = {};
    this.amount=null;
}
}
