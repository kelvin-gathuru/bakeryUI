import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IngredientsVsSalesComponent } from './ingredients-vs-sales.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: IngredientsVsSalesComponent }
	])],
	exports: [RouterModule]
})
export class IngredientsVsSalesRoutingModule { }
