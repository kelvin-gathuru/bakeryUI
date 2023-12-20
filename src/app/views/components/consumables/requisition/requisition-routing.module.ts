import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequisitionComponent } from './requisition.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RequisitionComponent }
	])],
	exports: [RouterModule]
})
export class RequisitionRoutingModule { }
