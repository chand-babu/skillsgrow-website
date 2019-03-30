import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { SEOService } from './../../common/seo.service';

@Component({
    selector: 'app-our-story',
    templateUrl: './ourstory.component.html',
})

export class OurStoryComponent implements OnInit {

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router, public seoService: SEOService) {
    }

    ngOnInit() {
        this.seoService.updateTitle('Our Story');
    }
}
