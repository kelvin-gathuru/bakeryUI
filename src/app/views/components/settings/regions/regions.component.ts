import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './regions.component.html',
    providers: [MessageService],
})
export class RegionsComponent implements OnInit {

    regionsDialog: boolean = false;

    deleteRegionDialog: boolean = false;

    selectedRegion: any[];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    regions: any;

    region: any = {};

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadRegions();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'status', header: 'Status' },
            { field: 'user.name', header: 'Created by' },
        ];

        this.statuses = [
            { label: 'ACTIVE', value: 'ACTIVE' },
            { label: 'INACTIVE', value: 'INACTIVE' },
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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
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

    saveRegion() {
        this.submitted = true;

        if (this.region.name?.trim()) {
            const payload = {
                name: this.region.name.toUpperCase(),
                status: this.region.status,
            };
            if (this.region.regionID) {
                const updatePayload = this.region;
                this.apiService.updateRegion(updatePayload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadRegions();
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
                this.apiService.createRegion(payload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadRegions();
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
        this.regionsDialog = false;
        this.region = {};
    }

    deleteRegion(region: any) {
        this.deleteRegionDialog = true;
        this.region = { ...region };
    }

    confirmDelete() {
        this.apiService.deleteRegion(this.region).subscribe(
            (result: any) => {
                if (result.success === true) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: result.message,
                    });
                    this.loadRegions();
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
        this.region = {};
        this.deleteRegionDialog = false;
    }
}
