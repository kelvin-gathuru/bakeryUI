import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/views/api/api.service';

@Component({
    templateUrl: './ingredients-vs-sales.component.html',
    providers: [MessageService]
})
export class IngredientsVsSalesComponent implements OnInit {

    submitted: boolean = false;

    selectedMaterials: any;

    selectedProducts: any;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    ingredients: any;

    products: any;

    region: any = {};
    dispatchedProducts: any;
    materials: any;
    regionsDialog: boolean;
    totalExpenditure: number;
    totalExpectedSales: number;
    endDate: string = "";
    startDate: string = "";
    totalAmount: any;

    constructor(private messageService: MessageService, private apiService: ApiService) { }

    ngOnInit() {


        this.loadIngredientVsProduct();

        
    }

    loadIngredientVsProduct() {
        this.apiService.getIngredientVsProduct(this.startDate,this.endDate).subscribe(
            (data: any) => {
                if (data.success == false) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: data.error.message,
                        life: 3000,
                    });
                }
                this.materials = data.data.materials;
                this.products = data.data.products.flatMap((innerArray: any[]) => innerArray);;
                this.totalAmount = this.products[this.products.length-1].totalSalesForRetrieval
                this.calculateExpenditure();
                this.calculateSales();
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
    onFromDate(value: Date){
        this.startDate = value.toISOString().slice(0,-1);
        this.loadIngredientVsProduct();
      }
      onToDate(value: Date){
        this.endDate = value.toISOString().slice(0,-1);
        this.loadIngredientVsProduct();
      }
    calculateExpenditure() {
        this.totalExpenditure = 0;

            for (let prod of this.materials) {
                if(prod.totalPrice==null){
                    prod.totalPrice = 0;
                }
                this.totalExpenditure += prod.totalPrice;
            }
        
    }
    calculateSales() {
        this.totalExpectedSales = 0;

            for (let prod of this.products) {
                if(prod.salesPrice==null){
                    prod.salesPrice = 0;
                }
                this.totalExpectedSales += prod.salesPrice;
            }
        
    }
}
