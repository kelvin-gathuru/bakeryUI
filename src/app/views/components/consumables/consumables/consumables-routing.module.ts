import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConsumablesComponent } from './consumables.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ConsumablesComponent }
	])],
	exports: [RouterModule]
})
export class ConsumablesRoutingModule { }
