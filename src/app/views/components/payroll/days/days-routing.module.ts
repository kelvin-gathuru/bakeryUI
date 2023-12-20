import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DaysComponent } from './days.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DaysComponent }
	])],
	exports: [RouterModule]
})
export class DaysRoutingModule { }
