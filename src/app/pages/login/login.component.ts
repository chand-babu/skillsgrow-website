import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginProxy } from './login.proxy';
import { Global } from '../../common/global';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from './../../components/snach-bar/sanck-bar.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [LoginProxy]
})

export class LoginComponent implements OnInit {
    public loginForm: Boolean = true;
    public forgotPasswordForm: Boolean = false;
    @ViewChild('defaultOpen') div: ElementRef;
    public set: any;
    public loginData = {
        emailId: '',
        password: ''
    };
    forPassword: any;
    public alertClass: boolean = false;
    public message: any;
    public expired: boolean = false;
    public forgotErrorMessage: boolean = false;
    public forgotSuccessMessage: boolean = false;

    constructor(public loginProxy: LoginProxy, public global: Global,
        public snackBar: MatSnackBar) {
    }

    ngOnInit() {
        if (this.global.getStorageDetail('company-user')) {
            this.alertClass = true;
            this.message = 'Company Account already logged in please logout';
        }
        if (this.global.getStorageDetail('user')) {
            this.global.navigateToNewPage('/userdashboard');
        }
        const url = this.global.url();
        console.log(url);
    }

    openSnackBar(message: String) {
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: message,
          duration: 1000,
        });
      }

    forgotPassword() {
        this.loginForm = false;
        this.forgotPasswordForm = true;
    }

    loginpath() {
        this.loginForm = true;
        this.forgotPasswordForm = false;
    }

    loginFieldsData(form) {
        if (this.global.getStorageDetail('company-user')) {
            this.alertClass = true;
            this.message = 'Company Account already logged in please logout';
        } else {
            this.loginProxy.loginDataService(this.loginData)
            .subscribe((success) => {
                if (!success.result) {
                    this.alertClass = true;
                    if (success.expired) {
                        this.message = success.message;
                        this.expired = true;
                    } else {
                        this.expired = false;
                        this.message = 'Username and password is invalid';
                    }
                } else {
                    form.reset();
                    this.alertClass = false;
                    this.global.storeDataLocal('user', success);
                    if (this.global.getStorageDetail('internshipRedirect')) {
                        this.global.navigateToNewPage('/internship/' +
                         this.global.getStorageDetail('internshipRedirect'));
                    } else {
                        this.global.navigateToNewPage('/userdashboard');
                    }
                    this.openSnackBar('Welcome to Skillsgrow !!!!');
                }
            });
        }
    }

    resetPassword() {
        this.loginProxy.forgotPasswordService({emailId: this.forPassword})
        .subscribe((success) => {
            if (!success.result) {
                this.forgotErrorMessage = true;
                this.forgotSuccessMessage = false;
                this.message = success.message;
            } else {
                this.forgotErrorMessage = false;
                this.forgotSuccessMessage = true;
                this.message = success.message;
            }
        });
    }
}
