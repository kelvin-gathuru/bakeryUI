import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayrollsComponent } from './payrolls.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PayrollsComponent }
	])],
	exports: [RouterModule]
})
export class PayrollsRoutingModule { }
