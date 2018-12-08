import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RegisterProxy } from './register.proxy';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [RegisterProxy]
})

export class RegisterComponent implements OnInit {
    @ViewChild('defaultOpen') div: ElementRef;
    public set: any;
    public learnerData = {
        userName: '',
        emailId: '',
        phone: '',
        password: '',
        cpassword: '',
        referId: ''
    };
    public successMessage: boolean = false;
    public errorMessage: boolean = false;
    public message: any;
    public sspId: any;

    constructor(public registerProxy: RegisterProxy, public global: Global,
        public activateRoute: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
        this.set = setInterval(this.defaultTab, 100);
        this.activateRoute.params.forEach(params => {
            this.sspId = params['id'];
            console.log(this.sspId);
            if (this.sspId !== 'sign-up') {
                this.registerProxy.getSSP()
                .subscribe((success: any) => {
                    let sspMemberId: boolean = false;
                    console.log(success);
                    const sspMembers = success.data;
                    sspMembers.filter((data) => {
                        if (data._id === this.sspId) {
                            sspMemberId = true;
                            this.learnerData.referId = this.sspId;
                        }
                    });
                    if (!sspMemberId) {
                        this.successMessage = false;
                        this.errorMessage = true;
                        this.message = 'Invalid SSP coupon code';
                    }
                });
            }
        });
    }

    tabFunction(evt, value) {
        const form: any = document.getElementsByClassName('tabcontent');
        for (let i = 0; i < form.length; i++) {
            form[i].style.display = 'none';
        }
        const docs = document.getElementsByClassName('tablinks');
        for (let i = 0; i < docs.length; i++) {
            docs[i].className = docs[i].className.replace('active', '');
        }
        document.getElementById(value).style.display = 'block';
        evt.currentTarget.className += 'active';
        clearInterval(this.set);
    }

    defaultTab() {
        document.getElementById('defaultOpen').click();
    }

    learnerFieldData(form) {
        if (this.learnerData.password === this.learnerData.cpassword) {
            delete this.learnerData.cpassword;
            console.log(this.learnerData);
            this.registerProxy.registerDataService(this.learnerData)
                .subscribe((success) => {
                    console.log(success);
                    if (success.result) {
                        this.successMessage = true;
                        this.errorMessage = false;
                        this.message = 'Please check your email for account activation !!!';
                        form.reset();
                    }
                });
        } else {
            this.errorMessage = true;
            this.successMessage = false;
            this.message = 'password does not matched';
        }
    }

    emailExistOrNot() {
        this.registerProxy.checkEmail(this.learnerData.emailId)
        .subscribe((success: any) => {
            if (success.result) {
                this.errorMessage = true;
                this.successMessage = false;
                this.message = 'Email Already Registered';
            } else {
                this.errorMessage = false;
                this.successMessage = false;
            }
        });
    }

}
