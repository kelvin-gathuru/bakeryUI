import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
        { path: 'regions', loadChildren: () => import('./regions/regions.module').then(m => m.RegionsModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
