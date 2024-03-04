import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'dispatch-report', loadChildren: () => import('./dispatch-report/dispatch-report.module').then(m => m.DispatchReportModule) },
        { path: 'ingredients-vs-sales', loadChildren: () => import('./ingredients-vs-sales/ingredients-vs-sales.module').then(m => m.IngredientsVsSalesModule) },
        { path: 'product-dispatch', loadChildren: () => import('./product-dispatch/product-dispatch.module').then(m => m.ProductDispatchModule) },
        { path: 'product-return', loadChildren: () => import('./product-return/product-return.module').then(m => m.ProductReturnModule) },
        { path: 'product-stock', loadChildren: () => import('./product-stock/product-stock.module').then(m => m.ProductStockModule) },
        { path: 'types', loadChildren: () => import('./types/types.module').then(m => m.TypesModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProductionRoutingModule { }
