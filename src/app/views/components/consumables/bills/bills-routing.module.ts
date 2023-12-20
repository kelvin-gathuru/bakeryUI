import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BillsComponent } from './bills.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BillsComponent }
	])],
	exports: [RouterModule]
})
export class BillsRoutingModule { }
