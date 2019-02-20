import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { EnrollmentPageProxy } from './enrollmentPage.proxy';
import { Constants } from '../../common/constants';
import { Router } from '@angular/router';
import { SafePipe } from '../../common/videourl.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsSHA from 'jssha';
import { DataService } from './../../common/data.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-enrollemnt-page',
    templateUrl: './enrollmentPage.component.html',
    providers: [EnrollmentPageProxy, SafePipe]
})

export class EnrollmentPageComponent implements OnInit {
    public courseData: any;
    public imagePath = Constants.IMAGEPATH;
    public hash: any;
    public random: any;
    public txid: any; // Math.floor(Math.random() * 100000) + 1;
    public amount: any;
    public phone: any;
    public firstname: any;
    public email: any;
    public surl = 'https://skillsgrow.com:8080/admin/payu-response';
    public furl = 'https://skillsgrow.com:8080/admin/payu-response';
    public productinfo: any;
    public udf1: any;
    public service_provider = 'payu_paisa';
    public userDetails: any;

    constructor(public global: Global, public enrollmentPageProxy: EnrollmentPageProxy,
        public router: Router, public videourl: SafePipe, private modalService: NgbModal,
        public courseDataService: DataService, public _location: Location) {
    }

    ngOnInit() {
        // console.log('new uid: ', uuid());
        // console.log(this.txid);
        this.courseDataService.currentCourseData.subscribe((courseData) => {
            this.courseData = courseData;
            if (!this.courseData) {
                this._location.back();
            } else {
                this.userDetails = this.global.getStorageDetail('user');
                this.courseData.videoUrl = this.videourl.transform(this.courseData.videoUrl);
            }
        });
    }

    enrollment() {
        const userEnrollmentData = {
            userId: this.userDetails.data._id,//added by nandita
            courseId: this.courseData.courseId,
            enrolledOn: new Date(),
            userEmailId: this.userDetails.data.emailId,//comented forlocal
            userName: this.userDetails.data.userName//comented forlocal
        };
        this.enrollmentPageProxy.courseEnrolledService(userEnrollmentData)
            .subscribe((success: any) => {
                this.userCourseEnrollment();
                document.getElementById('modelClose').click();
            });
    }

    modalPopupBox(content) {
        this.modalService.open(content);
        if (this.courseData.courseFee !== 'Free') {
            this.random = new Date();
            this.txid = this.random.valueOf();
            this.amount = this.courseData.courseFee;
            this.firstname = this.userDetails.data.userName;
            this.phone = this.userDetails.data.phone;
            this.email = this.userDetails.data.emailId;
            this.productinfo = this.courseData.courseName;
            this.udf1 = this.courseData.courseId;
            const hashkey = '2fj34Tfj|' + this.txid + '|' + this.amount + '|' + this.productinfo + '|' + this.firstname + '|' + this.email
                + '|' + this.udf1 + '||||||||||BwAIZab6ag';
            const key = new jsSHA('SHA-512', 'TEXT');
            key.update(hashkey);
            this.hash = key.getHash('HEX');
        }
    }

    userCourseEnrollment() {
        this.enrollmentPageProxy.listCategories()
            .subscribe((success: any) => {
                const courses = success.data;
                courses.filter((data) => {
                    data.course.filter((course) => {
                        if (this.courseData.courseId === course._id) {
                            course.userId = this.userDetails.data._id;
                            course.enrolledOn = new Date();
                            this.enrollmentPageProxy.userCourseEnrolledService(course)
                                .subscribe((succ: any) => {
                                    this.userDetails.data.courseEnrolled.push(course);
                                    this.global.storeDataLocal('user', this.userDetails);
                                    this.router.navigate(['/enrollmentcourselandingpage', course._id]);
                                });
                        }
                    });
                });
            });
    }
}
