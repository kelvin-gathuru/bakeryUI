import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LowstockComponent } from './lowstock.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LowstockComponent }
	])],
	exports: [RouterModule]
})
export class LowstockRoutingModule { }
