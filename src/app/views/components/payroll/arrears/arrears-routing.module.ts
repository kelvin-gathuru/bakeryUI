import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArrearsComponent } from './arrears.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ArrearsComponent }
	])],
	exports: [RouterModule]
})
export class ArrearsRoutingModule { }
