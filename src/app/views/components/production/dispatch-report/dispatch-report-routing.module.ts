import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DispatchReportComponent } from './dispatch-report.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DispatchReportComponent }
	])],
	exports: [RouterModule]
})
export class DispatchReportRoutingModule { }
