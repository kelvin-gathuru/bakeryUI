import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { MenuService } from '../app.menu.service';
import { ApiService } from 'src/app/views/api/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
    providers: [MessageService],
})
export class AppConfigComponent {

    display: boolean = false;

    createUserDialog: boolean = false;

    submitted: boolean = false;

    currentPassword: any;

    newPassword: any;

    confirmNewPassword: any;

    showSpinner: boolean = false;

    disableButton: boolean = false;

    isSuperAdmin: boolean = false;
    name: any;
    email: any;
    phone: any;

    constructor(
        private apiService: ApiService,
        public layoutService: LayoutService,
        public menuService: MenuService,
        private router: Router,
        private messageService: MessageService
    ) {}

    // Boolean to track the state of the sidebar (open or closed)
    isSidebarOpen: boolean = false;

    ngOnInit(){
        const userType=sessionStorage.getItem("userType");
        if(userType == 'SUPER_ADMIN'){
            this.isSuperAdmin = true;
        }

    }

    // Function triggered when the config button is clicked
    onConfigButtonClick() {
        this.isSidebarOpen = true;
    }

    // Function to handle user logout
    logout() {
        this.router.navigate(['']);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userType');
        sessionStorage.removeItem('name');
        this.isSidebarOpen = false;
    }
    // Function to initiate the password change process
    changePassword() {
        this.display = true;
    }
    createUser() {

        this.createUserDialog = true;
    }

    // Function to reset input fields when resetting the for
    onReset() {
        this.display = true;
        const inputFields = document.querySelectorAll('input'); // Get all the input fields
        inputFields.forEach((input: HTMLInputElement) => {
            input.value = ''; // Reset the value of each input field
        });
    }
    onChangePassword() {
        this.display = true;
        this.submitted = true;
        if(this.confirmNewPassword !== this.newPassword){
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Passwords do not match",
            });
        }
        else if (
            this.newPassword?.trim() &&
            this.currentPassword?.trim() &&
            this.confirmNewPassword?.trim()
        ) {
            this.disableButton = true;
            this.showSpinner = true;

            const payload = {
                currentPassword: this.currentPassword,
                newPassword: this.newPassword,
            };

            this.apiService.changePassword(payload).subscribe(
                (result: any) => {
                    if (result.success === true) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: result.message,
                        });
                        this.router.navigate(['/dashboard']);

                        this.showSpinner = false;
                        this.disableButton = false;
                        this.display = false;
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
    onCreateUser() {
        this.createUserDialog = true;
        this.submitted = true;
        if (
            this.name?.trim() &&
            this.email?.trim() &&
            this.phone?.trim()
        ) {
            this.disableButton = true;
            this.showSpinner = true;

            const payload = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                userType: "ADMIN"
            };

            this.apiService.createUser(payload).subscribe(
                (result: any) => {
                    if (result.success === true) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: result.message,
                        });
                        this.router.navigate(['/dashboard']);

                        this.showSpinner = false;
                        this.disableButton = false;
                        this.createUserDialog = false;
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
