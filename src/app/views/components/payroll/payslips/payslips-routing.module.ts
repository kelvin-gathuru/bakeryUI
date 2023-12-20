import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PayslipsComponent } from './payslips.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PayslipsComponent }
	])],
	exports: [RouterModule]
})
export class PayslipsRoutingModule { }
