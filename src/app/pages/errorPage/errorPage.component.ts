import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { SEOService } from './../../common/seo.service';

@Component({
    selector: 'app-error-page',
    templateUrl: './errorPage.component.html'
})

export class ErrorPageComponent implements OnInit {
    constructor(public global: Global, public seoService: SEOService) {
    }

    ngOnInit() {
        this.seoService.updateTitle('Skillsgrow');
    }

}
