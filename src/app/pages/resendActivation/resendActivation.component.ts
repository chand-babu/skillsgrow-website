import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { ResendActivationProxy } from './resendActivation.proxy';
import { SEOService } from './../../common/seo.service';


@Component({
    selector: 'app-reset-password',
    templateUrl: './resendActivation.component.html',
    providers: [ResendActivationProxy]
})

export class ResendActivationComponent implements OnInit {
    public token: any;
    public resendFormObj = {
        email: '',
        password: '',
        userName: ''
    };
    public successMessage: boolean = false;
    public errorMessage: boolean = false;
    public message: any;

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router,
        public resendActivationProxy: ResendActivationProxy, public seoService: SEOService) {
    }

    ngOnInit() {
        this.seoService.updateTitle('Skillsgrow');
        this.activateRoute.params.forEach(params => {
            this.token = params['token'];
        });
    }

    onSubmit() {
        this.resendActivationProxy.resendActivationData(this.resendFormObj)
            .subscribe((success: any) => {
                console.log(success);
                if (success.result) {
                    this.resendFormObj.userName = success.data.userName;
                    this.resendActivationProxy.resendLink(this.resendFormObj)
                        .subscribe((succ: any) => {
                            console.log(succ);
                            if (succ.result) {
                                this.successMessage = true;
                                this.errorMessage = false;
                                this.message = succ.message;
                            }
                        });
                } else {
                    this.errorMessage = true;
                    this.successMessage = false;
                    this.message = success.message;
                }
            });
    }

}
