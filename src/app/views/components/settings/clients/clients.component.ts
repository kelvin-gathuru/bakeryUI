import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/views/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/views/service/product.service';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './clients.component.html',
    providers: [MessageService]
})
export class ClientsComponent implements OnInit {

    clientsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    clients: any[];

    regType: { label: string; value: string; }[];
    salesType: { label: string; value: string; }[];

    constructor(private productService: ProductService, private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.loadClients();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'phone_number', header: 'Tel' },
            { field: 'entity_code', header: 'Client/Agent ID' },
            { field: 'active', header: 'Status' }
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

        this.regType = [
            { label: 'CLIENT', value: 'client' },
            { label: 'SALES AGENT', value: 'salesAgent' },
            { label: 'OTHERS', value: 'others' }
        ];

        this.salesType = [
            { label: 'BULK', value: 'bulk' },
            { label: 'RETAIL', value: 'retail' },
            { label: 'OTHERS', value: 'others' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.clientsDialog = true;
    }

    hideDialog() {
        this.clientsDialog = false;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.clientsDialog = true;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.clientsDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

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
          (data: any[]) => {
            this.clients = data;
          },
          (error) => {
            console.error('Error fetching clients data:', error);
          }
        );
      }
}
