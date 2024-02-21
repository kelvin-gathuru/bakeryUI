import { Component } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    providers: [MessageService],
})
export class ResetPasswordComponent {
    constructor(
        private apiService: ApiService,
        private router: Router,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {}

    email: any;

    newPassword: string;

    confirmNewPassword: string;

    submitted: boolean = false;

    showSpinner: boolean = false;

    disableButton: boolean = false;

    onReset() {
        this.submitted = true;
        if(this.confirmNewPassword !== this.newPassword){
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Passwords do not match",
        });
        }
        else if (this.confirmNewPassword?.trim() && this.newPassword?.trim()) {
            this.disableButton = true;
            this.showSpinner = true;


            this.route.queryParams.subscribe((params) => {
              this.email = params['email'];
            });
            const payload = {
                email: this.email,
                password: this.newPassword,
            };

            this.apiService.resetPassword(payload).subscribe(
                (result: any) => {
                    if (result.success === true) {
                        setTimeout(() => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: result.message,
                            });
                            this.router.navigate(['']);

                            this.showSpinner = false;
                            this.disableButton = false;
                        }, 5000);
                    }
                }
                ,
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
