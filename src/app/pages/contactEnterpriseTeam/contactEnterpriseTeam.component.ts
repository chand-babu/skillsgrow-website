import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactEnterpriseteamProxy } from './contactEnterpriseTeam.proxy';

@Component({
    selector: 'app-contact-enterprise-team',
    templateUrl: './contactEnterpriseTeam.component.html',
    providers: [ContactEnterpriseteamProxy]
})

export class ContactEnterpriseTeamComponent implements OnInit {
    public enterpriseTeamForm = {
        name: '',
        emailId: '',
        companyName: '',
        phoneNumber: '',
        phoneNumberCode: '',
        query: '',
        status: 0
    };
    public modalData = {
        title: 'Contact Enterprise Team',
        message: 'Message Successfully Send to Enterprise Team',
        redirect: '/'
    };
    public modalBox: boolean;

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router,
        public contactEnterpriseteamProxy: ContactEnterpriseteamProxy) {
    }

    onSubmit(form) {
        if (this.enterpriseTeamForm.phoneNumberCode === '') {
            this.enterpriseTeamForm.phoneNumberCode = '91';
        }
        this.contactEnterpriseteamProxy.enterpriseTeamFormData(this.enterpriseTeamForm)
            .subscribe((success: any) => {
                this.modalBox = true;
                form.reset();
                this.enterpriseTeamForm.phoneNumberCode = '';
                if (!success.result) {
                    this.modalData.message = success.message;
                }
            });
            this.modalBox = false;
    }

    ngOnInit() {
        const objects = document.getElementsByClassName('asyncImage');
        Array.from(objects).map((item: any) => {
            // Start loading image
            const img = new Image();
            img.src = item.dataset.src;
            // Once image is loaded replace the src of the HTML element
            img.onload = () => {
                item.classList.remove('asyncImage');
                return item.nodeName === 'IMG' ?
                    item.src = item.dataset.src :
                    item.style.backgroundImage = `url(${item.dataset.src})`;
            };
        });
    }
}
