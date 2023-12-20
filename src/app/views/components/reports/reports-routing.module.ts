import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'fleet', loadChildren: () => import('./fleet/fleet.module').then(m => m.FleetModule) },
        { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
        { path: 'product-sales', loadChildren: () => import('./product-sales/product-sales.module').then(m => m.ProductSalesModule) },
        { path: 'sales-statement', loadChildren: () => import('./sales-statement/sales-statement.module').then(m => m.SalesStatementModule) },
        { path: 'sales-summary', loadChildren: () => import('./sales-summary/sales-summary.module').then(m => m.SalesSummaryModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
