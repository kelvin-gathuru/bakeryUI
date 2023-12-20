import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDispatchComponent } from './product-dispatch.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductDispatchComponent }
	])],
	exports: [RouterModule]
})
export class ProductDispatchRoutingModule { }
