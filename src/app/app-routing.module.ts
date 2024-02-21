import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './views/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './views/components/login/login.component';
import { ForgotPasswordComponent } from './views/components/forgot-password/forgot-password.component';
import { authGuard } from './views/components/guards/auth.guard';
import { EmailSentComponent } from './views/components/email-sent/email-sent.component';
import { ResetPasswordComponent } from './views/components/reset-password/reset-password.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                
                path: 'dashboard', component: AppLayoutComponent, canActivate:[authGuard],
                children: [
                    { path: '', loadChildren: () => import('./views/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'settings', loadChildren: () => import('./views/components/settings/settings.module').then(m => m.SettingsModule) },
                    { path: 'consumables', loadChildren: () => import('./views/components/consumables/consumables.module').then(m => m.ConsumablesModule) },
                    { path: 'payroll', loadChildren: () => import('./views/components/payroll/payroll.module').then(m => m.PayrollModule) },
                    { path: 'production', loadChildren: () => import('./views/components/production/production.module').then(m => m.ProductionModule) },
                    { path: 'reports', loadChildren: () => import('./views/components/reports/reports.module').then(m => m.ReportsModule) }
                ]
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'email-sent', component: EmailSentComponent },
            { path: 'reset-your-password', component: ResetPasswordComponent },
            { path: '', component: LoginComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
