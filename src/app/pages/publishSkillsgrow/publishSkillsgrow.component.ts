import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublishSkillsgrowProxy } from './publishSkillsgrow.proxy';
import { SEOService } from './../../common/seo.service';

@Component({
    selector: 'app-publish-skillsgrow',
    templateUrl: './publishSkillsgrow.component.html',
    providers: [PublishSkillsgrowProxy]
})

export class PublishSkillsgrowComponent implements OnInit {
    public publishFormObj = {
        name: '',
        emailId: '',
        areaExpertise: '',
        phoneNumber: '',
        phoneNumberCode: '',
        message: '',
        status: 0
    };
    public modalData = {
        title: 'Publish On Skillsgrow',
        message: 'Message Successfully Send to Administrator',
        redirect: '/'
    };
    public modalBox: boolean;

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router,
        private modalService: NgbModal, public publishproxy: PublishSkillsgrowProxy, public seoService: SEOService) {
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
            };
        });
    }

    openLg(content) {
        this.modalService.open(content);
    }

    onSubmit(form) {
        if (this.publishFormObj.phoneNumberCode === '') {
            this.publishFormObj.phoneNumberCode = '91';
        }
        this.publishproxy.PublishSkillsgrowFormData(this.publishFormObj)
        .subscribe((success: any) => {
            form.reset();
            this.publishFormObj.phoneNumberCode = '';
            document.getElementById('modelClose').click();
            this.modalBox = true;
            if (!success.result) {
                this.modalData.message = success.message;
            }
        });
        this.modalBox = false;
    }

}
