import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DispatchComponent } from './dispatch.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DispatchComponent }
	])],
	exports: [RouterModule]
})
export class DispatchRoutingModule { }
