import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeductionsComponent } from './deductions.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DeductionsComponent }
	])],
	exports: [RouterModule]
})
export class DeductionsRoutingModule { }
