import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../../common/global';
import { ListingCourseProxy } from '../../components/course-listing/course-listing.proxy';
import { Constants } from '../../common/constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/* import * as jsPDF from 'jspdf'; */
import * as html2canvas from 'html2canvas';
import * as jsSHA from 'jssha';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './userDashboard.component.html',
    providers: [ListingCourseProxy]
})

export class UserDashboardComponent implements OnInit {
    public categoryListData: any;
    public progressObj: any[];
    public activeCourses: any;
    public imagePath = Constants.IMAGEPATH;
    public timeTakeInCourse: number;
    public getCanvas: any;
    public userDetails: any;
    public certificateCount = 0;
    public activeCoursesCount = 0;
    public hash: any;
    public random: any;
    public txid: any; // Math.floor(Math.random() * 100000) + 1;
    public amount: any;
    public phone: any;
    public firstname: any;
    public email: any;
    public surl = Constants.APIPATH + 'admin/payu-response';
    public furl = Constants.APIPATH + 'admin/payu-response';
    public productinfo: any;
    public udf1: any;
    public udf2: any;
    public service_provider = 'payu_paisa';
    public paidCertificate: boolean = false;
    public isImgLoaded: boolean = true;

    onLoad() {
        this.isImgLoaded = false;
    }


    constructor(public router: Router, public global: Global,
        public listingCourseProxy: ListingCourseProxy, private modalService: NgbModal) { }

    @ViewChild('SSPChangePassword') SSPChangePassword: ElementRef;

    ngOnInit() {
        this.userDetails = this.global.getStorageDetail('user').data;
        if (this.userDetails.loginStatus === 0) {
            setTimeout(() => {
                this.modalService.open(this.SSPChangePassword);
            }, 2000);
        }
        this.activeCourses = this.userDetails.courseEnrolled;
        let activeCourseProgress = 0;
        if (this.activeCourses.length >= 1) {
            this.activeCourses.filter((data) => {
                activeCourseProgress = (data.courseProgress) ? data.courseProgress + activeCourseProgress : activeCourseProgress + 0;
                if (data.courseProgress === 100) {
                    this.certificateCount++;
                } else {
                    this.activeCoursesCount++;
                }
            });
            activeCourseProgress = activeCourseProgress / this.activeCourses.length;
            activeCourseProgress = Math.round(activeCourseProgress);
            // console.log(activeCourseProgress);
            this.timeTakeInCourse = this.global.getStorageDetail('timeTaken');
            this.timeTakeInCourse = this.timeTakeInCourse / 60;
            this.timeTakeInCourse = Math.round(this.timeTakeInCourse);
            // console.log(this.timeTakeInCourse);
        }
        this.progressObj = [
            {
                width: '100',
                color: '#38baae',
                title: 'Certificates',
                sampleTitle: (this.certificateCount) ? this.certificateCount : '0'
            },
            {
                width: '100',
                color: '#0d88aa',
                title: 'Courses',
                sampleTitle: this.activeCourses.length
            },
            {
                width: '100',
                color: '#F7941D',
                title: 'Active Courses',
                sampleTitle: this.activeCoursesCount// activeCourseProgress
            },
            {
                width: '100',
                color: '#ff505d',
                title: 'Total Hours',
                sampleTitle: '0' // (this.timeTakeInCourse === undefined) ? '0' : this.timeTakeInCourse + 'min'
            }
        ];
        this.SSPMembers();
    }

    categoryListingCourse() {
        this.listingCourseProxy.listCategories()
            .subscribe((success: any) => {
                console.log(success);
                this.categoryListData = success.data;
            });
    }

    SSPMembers() {
        this.listingCourseProxy.getSSP()
            .subscribe((success: any) => {
                const SSPData = success.data;
                let wallet: number = 0;
                const courses: any = [];
                const userDataForSSP = [];
                let userEnrolledCourses: boolean = false;
                SSPData.filter((data) => {
                    if (data._id === this.userDetails.referId) {
                        data.wallet = (!data.wallet) ? data.wallet = 0 : data.wallet;
                        wallet = wallet + 5;
                        if (this.userDetails.courseEnrolled.length >= 1) {
                            userEnrolledCourses = true;
                            this.userCoursesThroughSSP(data, courses, wallet, userDataForSSP);
                        }
                        if (!userEnrolledCourses) {
                            userDataForSSP.push({
                                _id: this.userDetails._id,
                                name: this.userDetails.userName,
                                emailId: this.userDetails.emailId,
                                discountGotBySSP: wallet,
                                enrolledCourses: [],
                                paid: false,
                            });
                            data.wallet = data.wallet + wallet;
                        }
                        const SSPDataForUpdate = {
                            _id: data._id,
                            wallet: data.wallet,
                            discountUsers: []
                        };
                        this.SSPUpdateData(data, SSPDataForUpdate, userDataForSSP);
                        console.log(data);
                    }
                });
            });
    }

    userCoursesThroughSSP(data, courses, wallet, userDataForSSP) {
        this.userDetails.courseEnrolled.filter((course) => {
            courses.push({
                courseId: course._id,
                courseName: course.courseName,
                coursePrice: course.authorDetails[0].coursePrice,
                paid: false,
            });
            if (course.authorDetails[0].coursePrice === 'Free') {
                wallet = wallet + 5;
            } else {
                const coursePrice = course.authorDetails[0].coursePrice * 10 / 100;
                wallet = wallet + coursePrice;
            }
        });
        userDataForSSP.push({
            _id: this.userDetails._id,
            name: this.userDetails.userName,
            emailId: this.userDetails.emailId,
            enrolledCourses: courses,
            discountGotBySSP: wallet,
            paid: false,
        });
        data.wallet = data.wallet + wallet;
    }

    SSPUpdateData(data, SSPDataForUpdate, userDataForSSP) {
        if (data.discountUsers.length >= 1) {
            let userIsThereOrNot: boolean = false;
            data.discountUsers.filter((user) => {
                if (user._id === this.userDetails._id) {
                    userIsThereOrNot = true;
                    if (user.enrolledCourses) {
                        if (user.enrolledCourses.length !== this.userDetails.courseEnrolled.length) {
                            user.enrolledCourses = userDataForSSP[0].enrolledCourses;
                            SSPDataForUpdate.discountUsers = data.discountUsers;
                            this.SSPDataUpdateService(SSPDataForUpdate);
                        }
                    }
                }
            });
            if (!userIsThereOrNot) {
                data.discountUsers.push(userDataForSSP[0]);
                SSPDataForUpdate.discountUsers = data.discountUsers;
                this.SSPDataUpdateService(SSPDataForUpdate);
            }
        } else {
            SSPDataForUpdate.discountUsers.push(userDataForSSP[0]);
            this.SSPDataUpdateService(SSPDataForUpdate);
        }
    }

    SSPDataUpdateService(SSPDataForUpdate) {
        console.log(SSPDataForUpdate);
        this.listingCourseProxy.updateSSPDiscountUsers(SSPDataForUpdate)
            .subscribe((succ: any) => {
                console.log(succ);
            });
    }

    viewDetailsCourse(id: number) {
        this.router.navigate(['/coursedetailspage', id]);
    }

    enrollNowCourse() {
        if (!this.global.getStorageDetail('user')) {
            this.global.navigateToNewPage('/login');
        } else {
            this.global.navigateToNewPage('/enrollmentpage');
        }
    }

    continue(id) {
        this.router.navigate(['/enrollmentcourselandingpage', id]);
    }

    // @ViewChild('content') content: ElementRef;

    /* captureScreen() {
        let data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
            let imgWidth = 208;
            let imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png');
            let pdf = new jsPDF();
            let position = 0;
            pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight)
            pdf.save('MYPdf.pdf'); // Generated PDF
        });
    } */

    previewImage(content, courseName) {
        this.paidCertificate = false;
        this.modalService.open(content, { size: 'lg' });
        console.log(document.getElementById('certificateUserName'));
        document.getElementById('certificateUserName').innerHTML = this.userDetails.userName;
        document.getElementById('certificateCourseName').innerHTML = courseName;
        const data = document.getElementById('contentToConvert');
        html2canvas(data, {
            width: 1122,
            height: 900
        }).then(canvas => {
            // document.getElementById('previewImage').appendChild(canvas);
            this.getCanvas = canvas;
        });
    }

    download() {
        const imgageData = this.getCanvas.toDataURL('image/png');
        const newData = imgageData.replace(/^data:image\/png/, 'data:application/octet-stream');
        document.getElementById('btn-Convert-Html2Image').setAttribute('download', 'your_pic_name.png');
        document.getElementById('btn-Convert-Html2Image').setAttribute('href', newData);
    }

    openLg(content, courseData, amount, index) {
        console.log(index);
        this.paidCertificate = true;
        this.modalService.open(content);
        this.random = new Date();
        this.txid = this.random.valueOf();
        this.amount = 100; // amount;
        this.firstname = this.userDetails.userName;
        this.phone = this.userDetails.phone;
        this.email = this.userDetails.emailId;
        this.productinfo = courseData.courseName;
        this.udf1 = courseData._id;
        this.udf2 = 'certificatePayment';
        const hashkey = '2fj34Tfj|' + this.txid + '|' + this.amount + '|' + this.productinfo + '|' + this.firstname + '|' + this.email
            + '|' + this.udf1 + '|' + this.udf2 + '|||||||||BwAIZab6ag';
        const key = new jsSHA('SHA-512', 'TEXT');
        key.update(hashkey);
        this.hash = key.getHash('HEX');
    }

}
