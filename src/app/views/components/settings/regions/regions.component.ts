import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './regions.component.html',
    providers: [MessageService]
})
export class RegionsComponent implements OnInit {

    regionsDialog: boolean = false;

    selectedRegions: any[]

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    regions: any;

    region: any = {};

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {

        this.loadRegions();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Area Code' },
            { field: 'active', header: 'Status' },
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'active' },
            { label: 'INACTIVE', value: 'inactive' }
        ];

        
    }

    openNew() {
        this.region = {};
        this.submitted = false;
        this.regionsDialog = true;
    }

    hideDialog() {
        this.regionsDialog = false;
    }

    editRegion(region: any) {
        this.region = { ...region };
        this.regionsDialog = true;
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
      loadRegions() {
        this.apiService.getRegions().subscribe(
          (data: any) => {
            if(data.success==false){
              this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
            }
            this.regions = data;
          },
          (error) => {
            console.error('Error fetching regions data:', error);
          }
        );
      }
}
