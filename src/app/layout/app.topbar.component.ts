import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    tieredItems : any [] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
    ngOnInit(){
        this.tieredItems = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-desktop', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                items: [
                    { label: 'Clients', icon: 'pi pi-fw pi-id-card', routerLink: ['/dashboard/settings/clients'] },
                    { label: 'Sales Agents', icon: 'pi pi-fw pi-user', routerLink: ['/dasbboard/uikit/input'] },
                    { label: 'Sales Regions', icon: 'pi pi-fw pi-map-marker', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Suppliers', icon: 'pi pi-fw pi-users', routerLink: ['/uikit/invalidstate'] },
                ]
            },
            {
                label: 'Consumables',
                icon: 'pi pi-fw pi-list',
                items: [
                    { label: 'Consumables', icon: 'pi pi-fw pi-palette', routerLink: ['/dashboard/blocks'] },
                    { label: 'Stocking', icon: 'pi pi-fw pi-plus', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Requisition', icon: 'pi pi-fw pi-question', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Dispatch', icon: 'pi pi-fw pi-arrow-right', routerLink: ['/uikit/invalidstate'] },                ]
            },
            {
                label: 'Production',
                icon: 'pi pi-fw pi-book',
                items: [
                    { label: 'Product Types', icon: 'pi pi-fw pi-palette', routerLink: ['/dashboard/utilities/icons'] },
                    { label: 'Product Stock', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Product Dispatch', icon: 'pi pi-fw pi-arrow-right', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Dispatch Sales Report', icon: 'pi pi-fw pi-file-excel', routerLink: ['/uikit/invalidstate'] }, 
                    { label: 'Ingredients Vs Sales', icon: 'pi pi-fw pi-money-bill', routerLink: ['/dashboard/utilities/icons'] },                ]
            },
            {
                label: 'Sales Reports',
                icon: 'pi pi-fw pi-file-excel',
                items: [
                    {
                        label: 'Products Sales',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['/landing']
                    },
                    
                    {
                        label: 'Products Sales Summary',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/dashboard/pages/crud']
                    },
                    {
                        label: 'Payment',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Fleet Management',
                        icon: 'pi pi-fw pi-car',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Sales Statement',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
            {
                label: 'Sales Payroll',
                icon: 'pi pi-fw pi-money-bill',
                items: [
                    {
                        label: 'PayRoll Register',
                        icon: 'pi pi-fw pi-file-edit',
                        routerLink: ['/landing']
                    },
                    
                    {
                        label: 'Payrolls',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/dashboard/pages/crud']
                    },
                    {
                        label: 'Payslips',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Deductions',
                        icon: 'pi pi-fw pi-minus-circle',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Employee Earnings',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/pages/empty']
                    },
                    {
                        label: 'Days Worked',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/empty']
                    },
                    {
                        label: 'Arrears',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
        ];
    }
}
