import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SalesSummaryComponent } from './sales-summary.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SalesSummaryComponent }
	])],
	exports: [RouterModule]
})
export class SalesSummaryRoutingModule { }
