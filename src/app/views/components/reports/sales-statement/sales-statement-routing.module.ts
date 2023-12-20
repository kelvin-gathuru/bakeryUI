import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SalesStatementComponent } from './sales-statement.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SalesStatementComponent }
	])],
	exports: [RouterModule]
})
export class SalesStatementRoutingModule { }
