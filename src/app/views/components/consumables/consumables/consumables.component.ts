import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './consumables.component.html',
    providers: [MessageService],
})
export class ConsumablesComponent implements OnInit {
    materialDialog: boolean = false;

    material: any = {};

    materials: any;

    selectedMaterial: any[];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadMaterials();

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'metric', header: 'Metric' },
            { field: 'unitPrice', header: 'Unit price' },
            { field: 'reorderQuantity', header: 'Reorder Quantity' },
            { field: 'reorderPoint', header: 'reorder Point' },
        ];
    }

    openNew() {
        this.material = {};
        this.submitted = false;
        this.materialDialog = true;
    }

    hideDialog() {
        this.materialDialog = false;
    }

    editMaterial(material: any) {
        this.material = { ...material };
        this.materialDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    loadMaterials() {
        this.apiService.getMaterials().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.materials = data.data;
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

    saveMaterial() {
        this.submitted = true;

        if (this.material.name?.trim() && this.material.metric?.trim()) {
            const payload = {
                name: this.material.name.toUpperCase(),
                metric: this.material.metric,
                unitPrice: this.material.unitPrice,
                reorderQuantity: this.material.reorderQuantity,
                reorderPoint: this.material.reorderPoint,
                remainingQuantity: 0,
            };
            if (this.material.materialID) {
                const updatePayload = this.material;
                this.apiService.updateMaterial(updatePayload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadMaterials();
                            this.materialDialog = false;
                            this.material = {};
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
                this.apiService.createMaterial(payload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadMaterials();
                            this.materialDialog = false;
                            this.material = {};
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
}
