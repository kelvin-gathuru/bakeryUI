import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
})
export class LoginComponent {
    constructor(
        private apiService: ApiService,
        private router: Router,
        private messageService: MessageService
    ) {}
    password: string;

    email: string;

    submitted: boolean = false;

    showSpinner: boolean = false;

    disableButton: boolean = false;

    onLoginSubmit() {
        this.submitted = true;
        if (this.email?.trim() && this.password?.trim()) {
            this.disableButton = true;
            this.showSpinner = true;

            const payload = {
                email: this.email,
                password: this.password,
            };

            this.apiService.login(payload).subscribe(
                (result: any) => {
                    if (result.success === true) {
                        sessionStorage.setItem('token', result.data.token);
                        sessionStorage.setItem(
                            'userType',
                            result.data.userType
                        );
                        sessionStorage.setItem('name', result.data.name);
                        setTimeout(() => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.router.navigate(['/dashboard']);

                            this.showSpinner = false;
                            this.disableButton = false;
                        }, 0);
                    }
                },
                (error) => {
                    console.error(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error.message,
                    });
                    this.showSpinner = false;
                    this.disableButton = false;
                }
            );
        }
    }
}
