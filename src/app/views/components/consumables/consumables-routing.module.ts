import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'consumables', loadChildren: () => import('./consumables/consumables.module').then(m => m.ConsumablesModule) },
        { path: 'dispatch', loadChildren: () => import('./dispatch/dispatch.module').then(m => m.DispatchModule) },
        { path: 'requisition', loadChildren: () => import('./requisition/requisition.module').then(m => m.RequisitionModule) },
        { path: 'stocking', loadChildren: () => import('./stocking/stocking.module').then(m => m.StockingModule) },
        { path: 'bills', loadChildren: () => import('./bills/bills.module').then(m => m.BillsModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ConsumablesRoutingModule { }
