import { Component, OnInit, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDetailsPageProxy } from './courseDetailsPage.proxy';
import { Constants } from '../../common/constants';
import { SafePipe } from '../../common/videourl.component';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { DataService } from './../../common/data.service';
import { SEOService } from './../../common/seo.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';



@Component({
    selector: 'app-course-details-page',
    templateUrl: './courseDetailsPage.component.html',
    providers: [CourseDetailsPageProxy, SafePipe],
})

export class CourseDetailsPageComponent implements OnInit {
    public categoryListData: any;
    public imagePath = Constants.IMAGEPATH;
    public courseDetails = [];
    // public id: any;
    public courseNameUrl: any; //added by nandita
    public set: any;
    public urlTrue: boolean;
    public timing = 0;
    public courseTiming: any;
    public topicList = [];
    public currentRate = 5;
    public averageRate = 0;
    public reviewFormObj = {
        name: '',
        comment: '',
        rating: 0,
        emailId: '',
        userId: '',
        courseId: '',//added by nandita
        status: 0
    };
    public infoMessage: boolean = true;
    public errorMessage: boolean = false;
    public successMessage: boolean = false;
    public message: any;
    public courseId: any;
    public emailMatched: boolean = false;
    public user: any;
    public hideTheMenuBar: boolean = true;
    public editorContent: any;
    panelOpenState = false;
    events: string[] = [];
    public about: boolean = true;
    public curriculum: boolean = false;
    public review: boolean = false;
    public biography: boolean = false;
    public chatForums: boolean = false;
    public faq: boolean = false;

    public isImgLoaded: boolean = true;


    onLoad() {
        this.isImgLoaded = false;
    }

    constructor(public global: Global, public activateRoute: ActivatedRoute,
        public router: Router,
        public coursedetailspageProxy: CourseDetailsPageProxy,
        public videourl: SafePipe, private elementRef: ElementRef,
        private sanitizer: DomSanitizer,
        public courseDataService: DataService, public seoService: SEOService, @Inject(PLATFORM_ID) private platformId: Object) {
        activateRoute.params.subscribe(val => {
            // put the code from `ngOnInit` here bcz Router Navigate does not call ngOnInit when same page
            this.user = this.global.getStorageDetail('user');
            if (this.user) {
                this.user = this.global.getStorageDetail('user').data;
            }
            this.courseDataByName(this.global.convertDashesString(val.name)); //added by nandita
        });
    }


    ngOnInit() {
        // this.user = this.global.getStorageDetail('user');
        // if (this.user) {
        //     this.user = this.global.getStorageDetail('user').data;
        // }
        // this.courseNameUrl = this.activateRoute.snapshot.params['name'];
        // this.courseDataByName(this.global.convertDashesString(this.courseNameUrl)); //added by nandita

        // this.id = this.activateRoute.snapshot.params['id'];
        // this.activateRoute.params.forEach(params => {
        //     this.courseId = params['id'];
        //     this.courseDataById(this.courseId);
        // }); //commented by nandita
        // this.disableTab();

    }

    // courseDataById(id: any) {
    courseDataByName(name: string) { //edited by nandita
        // this.coursedetailspageProxy.getCourseData(id)
        this.coursedetailspageProxy.getCourseDataByName(name)
            .subscribe((success: any) => {
                this.courseDetails = success.data;
                // console.log("***********", this.courseDetails);
                // this.seoService.setRobots();
                this.seoService.updateTitle("Course - " + (this.courseDetails[0].courseName).toLowerCase());
                this.seoService.updateKeywords(this.courseDetails[0].courseKeywords ? this.courseDetails[0].courseKeywords : this.courseDetails[0].courseName);
                this.seoService.updateDescription(this.courseDetails[0].shortDescription);
                this.courseId = this.courseDetails[0]._id;//added by nandita
                this.hideTheMenuBar = true;
                // if (isPlatformBrowser(this.platformId)) {
                //     this.set = setInterval(this.defaultTab, 100);
                // }
                // this.set = setInterval(this.defaultTab, 100);
                this.editorContent = this.courseDetails[0].description;
                this.editorContent = this.sanitizer.bypassSecurityTrustHtml(this.editorContent);
                this.courseDetails[0].video = this.videourl.transform(this.courseDetails[0].video);
                this.checkingUserReferenceAndEnrollment();
                this.calculationCourseTiming();
            });
    }

    /* checking whether user from  SSP reference or not */
    checkingUserReferenceAndEnrollment() {
        this.courseDetails.filter((data) => {
            if (this.user) {
                // if (this.user.referId || this.user.status === 3) {
                //     let coursePrice = data.authorDetails[0].coursePrice;
                //     coursePrice = coursePrice - coursePrice * 10 / 100;
                //     data.authorDetails[0].coursePrice = coursePrice;
                // } //commented by nandita as per client told remove 10% off on course for ssp user
                this.checkingUserEnrollment(data);
            }
            data.courseReview.filter((user) => {
                this.averageRate = this.averageRate + user.rating;
            });
            this.averageRate = this.averageRate / data.courseReview.length;
        });
    }

    checkingUserEnrollment(data: any) {
        if (data.enrolledUser.length >= 1) {
            data.enrolledUser.filter((email) => {
                if (email.userEmailId === this.user.emailId) {
                    data.enrollBtn = false;
                }
            });
        }
    }

    /* Course timing calculation */
    calculationCourseTiming() {
        this.courseDetails[0].timeline.filter((topic) => {
            this.topicList.push(topic);
            topic.topics.filter((time) => {
                this.timing = this.timing + time.timing;
            });
        });
        const h = Math.floor(this.timing / 60);
        const m = this.timing % 60;
        const hr = h < 10 ? '0' + h : h;
        const min = m < 10 ? '0' + m : m;
        this.courseTiming = hr + ':' + min;
    }

    aboutCourse(evt, id) {
        switch (id) {
            case ('about'):
                this.about = true;
                this.aboutCourseBaseOnId(evt, id);
                break;
            case ('curriculum'):
                this.curriculum = true;
                this.aboutCourseBaseOnId(evt, id);
                break;
            case ('review'):
                this.review = true;
                this.aboutCourseBaseOnId(evt, id);
                break;
            case ('biography'):
                this.biography = true;
                this.aboutCourseBaseOnId(evt, id);
                break;
            case ('chatForums'):
                this.chatForums = true;
                this.aboutCourseBaseOnId(evt, id);
                break;
            case ('faq'):
                this.faq = true;
                this.aboutCourseBaseOnId(evt, id);
                break;
            default:
                this.about = true;
                this.aboutCourseBaseOnId(evt, 'about');
                break;
        }

    }

    aboutCourseBaseOnId(evt, id) {
        const form: any = this.elementRef.nativeElement.querySelectorAll('.tabcontent');
        for (let i = 0; i < form.length; i++) {
            form[i].style.display = 'none';
        }
        const tablinks = this.elementRef.nativeElement.querySelector('.tablinks');
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace('active', '');
        }
        if (this.elementRef.nativeElement.querySelector('#' + id)) {
            this.elementRef.nativeElement.querySelector('#' + id).style.display = 'block';
        }
        evt.currentTarget.className += 'active';
        clearInterval(this.set);
    }

    disableTab() {
        const form: any = this.elementRef.nativeElement.querySelectorAll('.tabcontent');
        console.log("++++++++++++++++", form)

        for (let i = 0; i < form.length; i++) {
            form[i].style.display = 'none';
        }
        // this.elementRef.nativeElement.querySelector('#about').style.display = 'block';
    }

    defaultTab() {
        document.getElementById('defaultOpen').click();
    }

    enrollNowCourse() {
        if (!this.user) {
            this.global.navigateToNewPage('/login');
        } else {
            const courseObj = {
                courseId: this.courseId,
                courseFee: this.courseDetails[0].authorDetails[0].coursePrice,
                certificateFee: this.courseDetails[0].authorDetails[0].certificatePrice,
                courseName: this.courseDetails[0].courseName,
                courseImage: this.courseDetails[0].imageLarge,
                courseTiming: this.courseTiming,
                courseRating: this.courseDetails[0].ratings,
                videoUrl: this.courseDetails[0].video,
                courseChapter: this.courseDetails[0].timeline.length
            };
            this.courseDataService.containCourseData(courseObj);
            this.router.navigate(['/enrollmentpage', this.courseId]);
        }
    }

    onSubmit(form) {
        const user = this.global.getStorageDetail('user');
        if (user) {
            if (this.courseDetails[0].enrolledUser.length > 0) {
                this.courseDetails[0].enrolledUser.filter((userData) => {
                    // if (userData.userEmailId === user.data.emailId) {
                    if (userData.userId.emailId === user.data.emailId) {//modified by nandita
                        this.checkWhetherUserReviewOrNot(user, form);
                    }
                });
            } else {
                this.infoMessage = false;
                this.errorMessage = true;
                this.message = 'Only Enrolled User Can Review the Course';
                form.reset();
            }
        } else {
            this.infoMessage = false;
            this.errorMessage = true;
            this.message = 'Sorry! Only Enrolled User Can Review the Course';
        }
    }

    checkWhetherUserReviewOrNot(user, form) {
        if (this.courseDetails[0].courseReview.length > 0) {
            this.courseDetails[0].courseReview.filter((data) => {
                // if (data.emailId === user.data.emailId) {
                if (data.userId.emailId === user.data.emailId) { //modified by nandita
                    this.infoMessage = false;
                    this.errorMessage = true;
                    this.emailMatched = true;
                    this.message = 'You already review this course';
                }
            });
            if (!this.emailMatched) {
                this.reviewFormData(user, form);
            }
        } else {
            this.reviewFormData(user, form);
        }
    }

    reviewFormData(user, form) {
        this.reviewFormObj.emailId = user.data.emailId;
        this.reviewFormObj.rating = this.currentRate;
        this.reviewFormObj.userId = user.data._id;
        this.reviewFormObj.courseId = this.courseId; //added by nandita
        this.coursedetailspageProxy.courseReviewService(this.reviewFormObj)
            .subscribe((success: any) => {
                form.reset();
                this.infoMessage = false;
                this.successMessage = true;
                this.message = 'Review sent successfully !!!';
                this.currentRate = 5;
            });
    }

    openNav() {
        this.elementRef.nativeElement.querySelector('#mySidenav').style.width = '300px';
        this.elementRef.nativeElement.querySelector('#main').style.marginLeft = '300px';
        this.hideTheMenuBar = false;
    }

    closeNav() {
        this.elementRef.nativeElement.querySelector('#mySidenav').style.width = '0';
        this.elementRef.nativeElement.querySelector('#main').style.marginLeft = '0';
        this.hideTheMenuBar = true;
    }

    todayDate() {
        const date = new Date();
        return ((date.getDate() < 10) ? '0' : '') +
            date.getDate() + '/' + (((date.getMonth() + 1) < 10) ? '0' : '') + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    currentTiming() {
        const date = new Date();
        return ((date.getHours() < 10) ? '0' : '') + date.getHours() + ':' +
            ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes() + ':' + ((date.getSeconds() < 10) ? '0' : '') + date.getSeconds();
    }

}
