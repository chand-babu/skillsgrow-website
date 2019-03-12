import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseProxy } from './response.proxy';
import { EnrollmentPageProxy } from '../enrollmentPage/enrollmentPage.proxy';

@Component({
    selector: 'app-response',
    templateUrl: './response.component.html',
    providers: [ResponseProxy, EnrollmentPageProxy]
})

export class ResponseComponent implements OnInit {
    public paymentResponse: any;
    public courseData: any;
    public userDetails: any;

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router,
        public responseProxy: ResponseProxy,
        public enrollmentPageProxy: EnrollmentPageProxy) {
    }

    ngOnInit() {
        this.courseData = this.global.getStorageDetail('currentCourseData');
         this.userDetails = this.global.getStorageDetail('user');
        this.activateRoute.params.forEach(params => {
            const id = params['id'];
            this.responseProxy.payuResponseData(id)
            .subscribe((success: any) => {
                this.paymentResponse = success.data;
                // console.log(this.paymentResponse);
                if (this.paymentResponse[0].status === 'success') {
                    if (this.paymentResponse[0].udf2 === 'certificatePayment') {
                        // alert(true);
                        this.certificatePayment(this.paymentResponse[0].udf1);
                    } else {
                        // alert(false);
                        this.enrollment(this.paymentResponse[0].udf1);
                    }
                }
            });
        });
    }

    enrollment(courseId) {
        const userEnrollmentData = {
            userId: this.userDetails.data._id,
            courseId: courseId,
            enrolledOn: new Date(),
            userEmailId: this.userDetails.data.emailId,
            userName: this.userDetails.data.userName
        };
        this.enrollmentPageProxy.courseEnrolledService(userEnrollmentData)
            .subscribe((success: any) => {
                this.userCourseEnrollment(courseId);
            });
    }

    userCourseEnrollment(courseId) {
        this.enrollmentPageProxy.listCategories()
            .subscribe((success: any) => {
                const courses = success.data;
                courses.filter((data) => {
                    data.course.filter((course) => {
                        if (courseId === course._id) {
                            course.userId = this.userDetails.data._id;
                            course.enrolledOn = new Date();
                            this.enrollmentPageProxy.userCourseEnrolledService(course)
                                .subscribe((succ: any) => {
                                    // console.log(succ);
                                    this.userDetails.data.courseEnrolled.push(course);
                                    this.global.storeDataLocal('user', this.userDetails);
                                    this.router.navigate(['/enrollmentcourselandingpage', course._id]);
                                });
                        }
                    });
                });
            });
    }

    certificatePayment(courseId) {
        this.responseProxy.certificatePaymentService({_id: this.userDetails.data._id, courseId: courseId})
        .subscribe((success: any) => {
            console.log(success);
        });
    }

}
