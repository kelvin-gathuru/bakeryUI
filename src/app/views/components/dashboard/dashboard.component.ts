import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApiService } from '../../api/api.service';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService],
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    chartData: any;

    materials: any;

    analytics: any;

    chartOptions: any;

    subscription!: Subscription;
    bestPricedProducts: any;

    constructor(private messageService: MessageService,
        private apiService: ApiService,
        public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }
    

    ngOnInit() {
        this.initChart();

        this.loadAnalytics();

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Sales',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-700'),
                    borderColor: documentStyle.getPropertyValue('--green-700'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    loadAnalytics() {
        this.apiService.getAnalytics().subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.analytics = data.data;
                this.materials = data.data.recentMaterials;
                this.bestPricedProducts = data.data.bestPricedProducts;
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
