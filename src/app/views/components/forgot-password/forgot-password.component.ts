import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService]
})
export class ForgotPasswordComponent {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
) {}

  email: string;

    submitted: boolean = false;

    showSpinner: boolean = false;

    disableButton: boolean = false;

onForgotPassword() {
        this.submitted = true;
        if (this.email?.trim() ) {
            this.disableButton = true;
            this.showSpinner = true;

            const payload = {
                email: this.email,
            };

            this.apiService.forgotPassword(payload).subscribe(
                (result: any) => {
                    if (result.success === true) {
                        setTimeout(() => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.router.navigate(['/email-sent']);

                            this.showSpinner = false;
                            this.disableButton = false;
                        }, 5000);
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

