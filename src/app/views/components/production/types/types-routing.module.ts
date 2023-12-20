import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TypesComponent } from './types.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TypesComponent }
	])],
	exports: [RouterModule]
})
export class TypesRoutingModule { }
