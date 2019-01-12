import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AllCoursesProxy } from './allCourses.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../../common/global';
import { Constants } from '../../common/constants';

@Component({
    selector: 'app-all-courses',
    templateUrl: './allCourses.component.html',
    providers: [AllCoursesProxy]
})

export class AllCoursesComponent implements OnInit {
    public courseListData: any;
    public imagePath = Constants.IMAGEPATH;
    public courseTiming = 0;
    public course = [];
    public courseType: any;

    constructor(public allCoursesProxy: AllCoursesProxy, public activateRoute: ActivatedRoute,
        public global: Global, public router: Router) { }

    ngOnInit() {
    }
}
