import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './views/components/notfound/notfound.component';
import { CountryService } from './views/service/country.service';
import { EventService } from './views/service/event.service';
import { IconService } from './views/service/icon.service';
import { NodeService } from './views/service/node.service';
import { LoginComponent } from './views/components/login/login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ForgotPasswordComponent } from './views/components/forgot-password/forgot-password.component';
import { ToastModule } from 'primeng/toast';
import { EmailSentComponent } from './views/components/email-sent/email-sent.component';
import { ResetPasswordComponent } from './views/components/reset-password/reset-password.component';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, LoginComponent, ForgotPasswordComponent, EmailSentComponent, ResetPasswordComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        CommonModule,
        ToastModule
    ],
    providers: [
        { provide: PathLocationStrategy, useClass: PathLocationStrategy },
        CountryService, EventService, IconService, NodeService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
