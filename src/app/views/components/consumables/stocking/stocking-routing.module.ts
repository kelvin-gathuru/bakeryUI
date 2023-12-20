import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockingComponent } from './stocking.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: StockingComponent }
	])],
	exports: [RouterModule]
})
export class StockingRoutingModule { }
