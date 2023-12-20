import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FleetComponent } from './fleet.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FleetComponent }
	])],
	exports: [RouterModule]
})
export class FleetRoutingModule { }
