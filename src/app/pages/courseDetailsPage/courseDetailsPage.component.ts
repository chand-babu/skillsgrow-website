import { Component, OnInit, ElementRef, ViewChildren, HostListener } from '@angular/core';
import { Global } from '../../common/global';
import { ListingCourseProxy } from './../../components/course-listing/course-listing.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDetailsPageProxy } from './courseDetailsPage.proxy';
import { Constants } from '../../common/constants';
import { SafePipe } from '../../common/videourl.component';
import { DomSanitizer } from '@angular/platform-browser';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-course-details-page',
    templateUrl: './courseDetailsPage.component.html',
    providers: [ListingCourseProxy, CourseDetailsPageProxy, SafePipe],
})

export class CourseDetailsPageComponent implements OnInit {
    public categoryListData: any;
    public imagePath = Constants.IMAGEPATH;
    public courseDetails = [];
    public id: any;
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
    public chatObj = {
        chatMessage: '',
        createdOn: new Date()
    };
    public chatData = [];
    public chatMessage = '';
    public messageIndex: any;
    public editorContent: any;
    public replayUserName: boolean = false;
    public socket: any;
    public chatSet = {};

    constructor(public global: Global, public activateRoute: ActivatedRoute,
        public listingCourseProxy: ListingCourseProxy, public router: Router,
        public coursedetailspageProxy: CourseDetailsPageProxy,
        public videourl: SafePipe, private elementRef: ElementRef,
        private sanitizer: DomSanitizer) {
    }

    @ViewChildren('textarea') vc;


    ngOnInit() {
        this.user = this.global.getStorageDetail('user');
        if (this.user) {
            this.user = this.global.getStorageDetail('user').data;
        }
        this.id = this.activateRoute.snapshot.params['id'];
        this.activateRoute.params.forEach(params => {
            this.courseId = params['id'];
            this.categoryListingCourse(this.courseId);
        });
        this.socket = io.connect('http://localhost:3000/');
        this.socket.emit('sendCourseId', this.courseId);
        this.socket.on('chatHistory', (data) => {
            console.log(data);
            // this.chatData = data.discussionData;
            // this.coursedetailspageProxy.getDiscussionForumsService(data.courseId)
            // .subscribe((success: any) => {
            //     this.chatData = success.data.discussionForums;
            //     setTimeout(() => {
            //         const messageBody = document.querySelector('#messageBody');
            //         messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
            //     }, 1000);
                
            // });
        });
    }

    categoryListingCourse(id) {
        this.listingCourseProxy.listCategories()
            .subscribe((success: any) => {
                this.categoryListData = success.data;
                console.log(this.categoryListData);
                for (let i = 0; i < this.categoryListData.length; i++) {
                    this.categoryListData[i].course.filter((currentCourse) => {
                        if (id === currentCourse._id) {
                            this.courseDetails = [];
                            this.courseDetails.push(currentCourse);
                            this.hideTheMenuBar = true;
                            this.set = setInterval(this.defaultTab, 100);
                            this.editorContent = this.courseDetails[0].description;
                            this.editorContent = this.sanitizer.bypassSecurityTrustHtml(this.editorContent);
                            if (this.courseDetails[0].discussionForums) {
                                this.chatData = this.courseDetails[0].discussionForums;
                            }
                            this.courseDetails[0].video = this.videourl.transform(this.courseDetails[0].video);
                            this.courseDetails.filter((data) => {
                                if (this.user) {
                                    if (this.user.referId || this.user.status === 3) {
                                        let coursePrice = data.authorDetails[0].coursePrice;
                                        coursePrice = coursePrice - coursePrice * 10 / 100;
                                        data.authorDetails[0].coursePrice = coursePrice;
                                    }
                                    if (data.enrolledUser.length >= 1) {
                                        data.enrolledUser.filter((email) => {
                                            if (email.userEmailId === this.user.emailId) {
                                                data.enrollBtn = false;
                                            }
                                        });
                                    }
                                }
                                data.courseReview.filter((user) => {
                                    this.averageRate = this.averageRate + user.rating;
                                });
                                this.averageRate = this.averageRate / data.courseReview.length;
                            });
                            this.courseDetails[0].timeline.filter((topic) => {
                                this.topicList.push(topic);
                                topic.topics.filter((time) => {
                                    this.timing = this.timing + time.timing;
                                });
                            });
                        }
                    });
                }
                const h = Math.floor(this.timing / 60);
                const m = this.timing % 60;
                const hr = h < 10 ? '0' + h : h;
                const min = m < 10 ? '0' + m : m;
                this.courseTiming = hr + ':' + min;
            });
    }

    aboutCourse(evt, id) {
        const form: any = this.elementRef.nativeElement.querySelectorAll('.tabcontent');
        for (let i = 0; i < form.length; i++) {
            form[i].style.display = 'none';
        }
        const tablinks = this.elementRef.nativeElement.querySelector('.tablinks');
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace('active', '');
        }
        this.elementRef.nativeElement.querySelector('#' + id).style.display = 'block';
        evt.currentTarget.className += 'active';
        clearInterval(this.set);
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
            this.global.storeDataLocal('currentCourseData', courseObj);
            this.router.navigate(['/enrollmentpage', this.courseId]);
        }
    }

    onSubmit(form) {
        const user = this.global.getStorageDetail('user');
        if (user) {
            if (this.courseDetails[0].enrolledUser.length > 0) {
                this.courseDetails[0].enrolledUser.filter((userData) => {
                    if (userData.userEmailId === user.data.emailId) {
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
                if (data.emailId === user.data.emailId) {
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
        this.coursedetailspageProxy.courseReviewService(this.reviewFormObj)
            .subscribe((success: any) => {
                
                form.reset();
                this.infoMessage = false;
                this.successMessage = true;
                this.message = 'Review sent successfully !!!';
                this.currentRate = 5;
                // this.categoryListingCourse(this.courseId);
            });
    }

    openNav() {
        this.elementRef.nativeElement.querySelector('#mySidenav').style.width = '300px';
        this.elementRef.nativeElement.querySelector('#main').style.marginLeft = '300px';
        this.hideTheMenuBar = false;
        this.topicAccordion();
    }

    closeNav() {
        this.elementRef.nativeElement.querySelector('#mySidenav').style.width = '0';
        this.elementRef.nativeElement.querySelector('#main').style.marginLeft = '0';
        this.hideTheMenuBar = true;
    }

    topicAccordion() {
        this.elementRef.nativeElement.querySelector('#defaultAccordionPanel1').style.maxHeight = 'inherit';
        this.elementRef.nativeElement.querySelector('#defaultAccordionTitle1').className += ' active';
        const acc: any = this.elementRef.nativeElement.querySelectorAll('.accordion');
        
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener('click', () => {
                
                acc[i].classList.toggle('active');
                const panel = acc[i].nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            });
        }
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

    sendUserMessage() {
        this.replayUserName = false;
        const user = this.global.getStorageDetail('user');
        let emailMatched: boolean = false;
        if (user) {
            if (this.courseDetails[0].enrolledUser.length > 0) {
                this.courseDetails[0].enrolledUser.filter((data) => {
                    if (data.userEmailId === user.data.emailId) {
                        emailMatched = true;
                    }
                });
                if (emailMatched) {
                    this.chatObj.chatMessage = this.chatMessage;
                    if (this.messageIndex || this.messageIndex === 0) {
                        this.chatSet = {
                            position: this.messageIndex,
                            userName: user.data.userName,
                            userId: user.data._id,
                            replyMessage: this.chatMessage,
                            createdOn: this.todayDate() + ' ' + this.currentTiming()
                        };
                        this.messageIndex = undefined;
                    } else {
                        this.chatSet = {
                            position: this.messageIndex,
                            userName: user.data.userName,
                            userId: user.data._id,
                            chatMessage: this.chatMessage,
                            createdOn: this.todayDate() + ' ' + this.currentTiming(),
                            replyMessage: []
                        };
                    }
                    
                    const discussionForumsDetails = {
                        courseId: this.courseDetails[0]._id,
                        discussionData: this.chatSet
                    };
                    this.socket.emit('storeChatMessage', discussionForumsDetails);
                    // this.coursedetailspageProxy.discussionForumsService(discussionForumsDetails)
                    //     .subscribe((success) => {
                    //         this.socket.emit('sendMessage', discussionForumsDetails);
                    //     });
                } else {
                    this.infoMessage = false;
                    this.errorMessage = true;
                    this.message = 'Only Enrolled User Can Participate In this Discussion';
                }
            } else {
                this.infoMessage = false;
                this.errorMessage = true;
                this.message = 'Only Enrolled User Can Participate In this Discussion';
            }
        } else {
            this.global.navigateToNewPage('/login');
        }
    }

    chatReplyLink(index) {
        this.replayUserName = true;
        this.messageIndex = index;
        this.vc.first.nativeElement.focus();
    }

}
