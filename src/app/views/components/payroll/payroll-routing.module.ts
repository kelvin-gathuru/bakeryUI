import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'arrears', loadChildren: () => import('./arrears/arrears.module').then(m => m.ArrearsModule) },
        { path: 'days', loadChildren: () => import('./days/days.module').then(m => m.DaysModule) },
        { path: 'deductions', loadChildren: () => import('./deductions/deductions.module').then(m => m.DeductionsModule) },
        { path: 'earnings', loadChildren: () => import('./earnings/earnings.module').then(m => m.EarningsModule) },
        { path: 'payrolls', loadChildren: () => import('./payrolls/payrolls.module').then(m => m.PayrollsModule) },
        { path: 'payslips', loadChildren: () => import('./payslips/payslips.module').then(m => m.PayslipsModule) },
        { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PayrollRoutingModule { }
