import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './product-sales.component.html',
    providers: [MessageService]
})
export class ProductSalesComponent implements OnInit {

    clientsDialog: boolean = false;

    client: any = {};

    selectedClients: any[]

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    producttSales: any[];

    clients: any[] ;

    regType: { label: string; value: string; }[];
    salesType: { label: string; value: string; }[];

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {

        this.loadClients();

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

    // saveProduct() {
    //     this.submitted = true;

    //     if (this.product.name?.trim()) {
    //         if (this.product.id) {
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
    //             this.products[this.findIndexById(this.product.id)] = this.product;
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //         } else {
    //             this.product.id = this.createId();
    //             this.product.code = this.createId();
    //             this.product.image = 'product-placeholder.svg';
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
    //             this.products.push(this.product);
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         }

    //         this.products = [...this.products];
    //         this.clientsDialog = false;
    //         this.product = {};
    //     }
    // }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (this.products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
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
}
