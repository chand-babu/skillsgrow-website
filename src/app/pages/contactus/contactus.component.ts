import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactUsProxy } from './contactus.proxy';
import { SEOService } from './../../common/seo.service';


@Component({
    selector: 'app-contact-us',
    templateUrl: './contactus.component.html',
    providers: [ContactUsProxy]
})

export class ContactUsComponent implements OnInit {
    public contactusObj = {
        name: '',
        emailId: '',
        phone: '',
        subject: '',
        message: ''
    }
    public modalData = {
        title: 'Contact Us',
        message: 'Message Successfully Send to Administrator',
        redirect: '/'
    }
    public modalBox: boolean;

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router,
        public contactusproxy: ContactUsProxy, public seoService: SEOService) {
    }

    ngOnInit() {
        this.seoService.updateTitle('Contact Us');
    }

    onSubmit() {
        this.contactusproxy.contactusData(this.contactusObj)
        .subscribe((success: any) => {
            this.modalBox = true;
            if (!success.result) {
                this.modalData.message = success.message;
            }
        });
        this.modalBox = false;
    }

}
