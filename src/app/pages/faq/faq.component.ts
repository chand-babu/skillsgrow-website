import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqProxy } from './faq.proxy';
import { SEOService } from './../../common/seo.service';


@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    providers: [FaqProxy]
})

export class FAQComponent implements OnInit {
    public askQuestionForm = {
        name: '',
        emailId: '',
        question: ''
    };
    public modalData = {
        title: 'FAQ',
        message: 'Message Successfully Send to Administrator',
        redirect: '/'
    }
    public modalBox: boolean;
    public errorMessage: boolean = false;
    public message: any;

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router,
        public faq: FaqProxy, public seoService: SEOService) {
    }

    ngOnInit() {
        this.seoService.updateTitle('Skillsgrow');
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
            }
        });
    }

    onSubmit() {
        if (this.global.getStorageDetail('user')) {
            const user = this.global.getStorageDetail('user').data;
            this.askQuestionForm.name = user.userName;
            this.askQuestionForm.emailId = user.emailId;
            this.errorMessage = false;
            this.faq.askQuestionFormData(this.askQuestionForm)
                .subscribe((success: any) => {
                    this.modalBox = true;
                    if (!success.result) {
                        this.modalData.message = success.message;
                    }
                });
        } else {
            this.errorMessage = true;
            this.message = 'Only registered user can ask question';
        }
        this.modalBox = false;
    }

}
