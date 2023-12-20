import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductSalesComponent } from './product-sales.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductSalesComponent }
	])],
	exports: [RouterModule]
})
export class ProductSalesRoutingModule { }
