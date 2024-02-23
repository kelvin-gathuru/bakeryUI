import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];

    tieredItems: any[] = [];

    userName: any;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        const name = sessionStorage.getItem('name');

        this.userName = name;

        this.tieredItems = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-desktop',
                        routerLink: ['/dashboard'],
                    },
                ],
            },
            {
                label: 'Clients',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Clients/Sales Agents',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/dashboard/settings/clients'],
                    },
                    {
                        label: 'Sales Regions',
                        icon: 'pi pi-fw pi-map-marker',
                        routerLink: ['/dashboard/settings/regions'],
                    },
                    {
                        label: 'Suppliers',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/dashboard/settings/suppliers'],
                    },
                    
                ],
            },
            {
                label: 'Materials',
                icon: 'pi pi-fw pi-list',
                items: [
                    {
                        label: 'Consumables',
                        icon: 'pi pi-fw pi-palette',
                        routerLink: ['/dashboard/consumables/consumables'],
                    },
                    {
                        label: 'Stocking',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['/dashboard/consumables/stocking'],
                    },
                    // { label: 'Requisition', icon: 'pi pi-fw pi-question', routerLink: ['/dashboard/consumables/requisition'] },
                    {
                        label: 'Dispatch',
                        icon: 'pi pi-fw pi-arrow-right',
                        routerLink: ['/dashboard/consumables/dispatch'],
                    },
                    // { label: 'Bills', icon: 'pi pi-fw pi-money-bill', routerLink: ['/dashboard/consumables/bills'] },
                ],
            },
            {
                label: 'Products',
                icon: 'pi pi-fw pi-book',
                items: [
                    {
                        label: 'Product Types',
                        icon: 'pi pi-fw pi-palette',
                        routerLink: ['/dashboard/production/types'],
                    },
                    {
                        label: 'Product Stock',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/dashboard/production/product-stock'],
                    },
                    {
                        label: 'Product Dispatch',
                        icon: 'pi pi-fw pi-arrow-right',
                        routerLink: ['/dashboard/production/product-dispatch'],
                    },
                    {
                        label: 'Dispatch Sales Report',
                        icon: 'pi pi-fw pi-file-excel',
                        routerLink: ['/dashboard/production/dispatch-report'],
                    },
                    {
                        label: 'Ingredients Vs Sales',
                        icon: 'pi pi-fw pi-money-bill',
                        routerLink: [
                            '/dashboard/production/ingredients-vs-sales',
                        ],
                    },
                ],
            },
            {
                label: 'Sales Reports',
                icon: 'pi pi-fw pi-file-excel',
                items: [
                    {
                        label: 'Products Sales',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['/dashboard/reports/product-sales'],
                    },

                    {
                        label: 'Products Sales Summary',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/dashboard/reports/sales-summary'],
                    },
                    {
                        label: 'Payment',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['/dashboard/reports/payment'],
                    },
                    {
                        label: 'Fleet Management',
                        icon: 'pi pi-fw pi-car',
                        routerLink: ['/dashboard/reports/fleet'],
                    },
                    {
                        label: 'Sales Statement',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/dashboard/reports/sales-statement'],
                    },
                ],
            },
            {
                label: 'Sales Payroll',
                icon: 'pi pi-fw pi-money-bill',
                items: [
                    {
                        label: 'PayRoll Register',
                        icon: 'pi pi-fw pi-file-edit',
                        routerLink: ['/dashboard/payroll/register'],
                    },

                    {
                        label: 'Payrolls',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/dashboard/payroll/payrolls'],
                    },
                    {
                        label: 'Payslips',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/dashboard/payroll/payslips'],
                    },
                    {
                        label: 'Deductions',
                        icon: 'pi pi-fw pi-minus-circle',
                        routerLink: ['/dashboard/payroll/deductions'],
                    },
                    {
                        label: 'Employee Earnings',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/dashboard/payroll/earnings'],
                    },
                    {
                        label: 'Days Worked',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/dashboard/payroll/days'],
                    },
                    {
                        label: 'Arrears',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/dashboard/payroll/arrears'],
                    },
                ],
            },
        ];
    }
}
