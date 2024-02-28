import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './dispatch.component.html',
    providers: [MessageService],
})
export class DispatchComponent implements OnInit {
    materialDispatchDialog: boolean = false;

    metric: string = '';

    materialDispatch: any = {};

    selectedMaterialDispatch: any[];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    materialDispatches: any[];

    materials: any;

    suppliers: any[];

    initialQuantity: any;

    totalPrice: any;

    shifts: { label: string; value: string }[];

    constructor(
        private messageService: MessageService,
        private apiService: ApiService
    ) {}

    ngOnInit() {
        this.loadMaterials();

        this.loadMaterialDispatch();

        this.cols = [
            { field: 'material.name', header: 'Material' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'material.totalPrice', header: 'Total Price' },
            { field: 'shift', header: 'Shift' },
            { field: 'dispatchDate', header: 'Dispatch Date' },
            { field: 'description', header: 'Description' },
        ];

        this.shifts = [
            { label: 'DAY', value: 'DAY' },
            { label: 'NIGHT', value: 'NIGHT' },
        ];
    }

    openNew() {
        this.materialDispatch = {};
        this.submitted = false;
        this.materialDispatchDialog = true;
    }

    hideDialog() {
        this.materialDispatchDialog = false;
    }

    editMaterialDispatch(materialDispatch: any) {
        this.materialDispatch = { ...materialDispatch };
        this.materialDispatchDialog = true;
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

    loadMaterialDispatch() {
        this.apiService.getMaterialDispatch().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.materialDispatches = data.data;
                this.initialQuantity = data.data;
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

    saveMaterialDispatch() {
        this.submitted = true;

        if (this.materialDispatch.description?.trim()) {
            const payload = {
                initialQuantity: this.materialDispatch.quantity,
                material: this.materialDispatch.material,
                shift: this.materialDispatch.shift,
                description: this.materialDispatch.description,
            };
            if (this.materialDispatch.materialDispatchID) {
                const previousQuantity = this.initialQuantity.find(
                    (obj) =>
                        obj.materialDispatchID ==
                        this.materialDispatch.materialDispatchID
                );
                const updatePayload = {
                    materialDispatchID:
                        this.materialDispatch.materialDispatchID,
                    initialQuantity: previousQuantity.quantity,
                    updatedQuantity: this.materialDispatch.quantity,
                    material: this.materialDispatch.material,
                    shift: this.materialDispatch.shift,
                    description: this.materialDispatch.description,
                    purchaseDate: this.materialDispatch.purchaseDate,
                    user: this.materialDispatch.user,
                };
                this.apiService.updateMaterialDispatch(updatePayload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadMaterialDispatch();
                            this.materialDispatchDialog = false;
                            this.materialDispatch = {};
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
                this.apiService.createMaterialDispatch(payload).subscribe(
                    (result: any) => {
                        if (result.success === true) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.loadMaterialDispatch();
                            this.materialDispatchDialog = false;
                            this.materialDispatch = {};
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
    calculatePrice() {
        this.totalPrice =
            this.materialDispatch.material.unitPrice *
            this.materialDispatch.quantity;
        this.metric = this.materialDispatch.material.metric;
    }
}
