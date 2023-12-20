import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EarningsComponent } from './earnings.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EarningsComponent }
	])],
	exports: [RouterModule]
})
export class EarningsRoutingModule { }
