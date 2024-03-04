import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductReturnComponent } from './product-return.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductReturnComponent }
	])],
	exports: [RouterModule]
})
export class ProductReturnRoutingModule { }
