import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductStockComponent } from './product-stock.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductStockComponent }
	])],
	exports: [RouterModule]
})
export class ProductStockRoutingModule { }
