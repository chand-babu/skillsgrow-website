import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationExtras } from '@angular/router';
import { Global } from '../../common/global';
import { DomSanitizer } from '@angular/platform-browser';
import { ListingCourseProxy } from '../../components/course-listing/course-listing.proxy';
import { CourseDetailsPageProxy } from '../courseDetailsPage/courseDetailsPage.proxy';
import * as io from 'socket.io-client';

@Component({
    selector: 'app-course-learning-page',
    templateUrl: './courseLearningPage.component.html',
    providers: [ListingCourseProxy, CourseDetailsPageProxy]
})

export class CourseLearningPageComponent implements OnInit {
    public paramsData: any;
    public editorContent: any;
    public sideNavStatus: boolean = true;
    public courseLearningData = [];
    public subTopicContent: any;
    public socket: any;
    public selectsubTopic: any;
    public testBtnShow: boolean = false;
    // Chat Forums
    public chatForumsSection: boolean = false;
    public chatObj = {
        chatMessage: '',
        createdOn: new Date()
    };
    public innerWidth: any;
    public courseId: string;

    constructor(private activeRoute: ActivatedRoute, private router: Router,
        public global: Global, private sanitizer: DomSanitizer,
        private elementRef: ElementRef, public courseListingProxy: ListingCourseProxy,
        public coursedetailspageProxy: CourseDetailsPageProxy) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth < 768) {
            this.elementRef.nativeElement.querySelector('#mySidenav').style.width = '0';
            this.elementRef.nativeElement.querySelector('#mySidenav').style.position = 'absolute';
            this.elementRef.nativeElement.querySelector('#mySidenav').style.left = '-300px';
            this.elementRef.nativeElement.querySelector('#mySidenav').style.marginLeft = '0';
            this.elementRef.nativeElement.querySelector('#main').style.marginLeft = '0';
            this.sideNavStatus = true;
        }
    }

    ngOnInit() {
        this.innerWidth = window.innerWidth;
        this.paramsData = this.global.getStorageDetail('courselearn');
        this.activeRoute.params.forEach(params => {
            this.courseId = params['id'];
            this.categoryListing();
        });
    }

    takeTest() {
        this.router.navigate(['coursetestpage', this.paramsData.courseId]);
    }

    openNav() {
        if (this.sideNavStatus) {
            // console.log(this.elementRef.nativeElement.querySelector('#mySidenav'));
            this.elementRef.nativeElement.querySelector('#mySidenav').style.width = '300px';
            this.elementRef.nativeElement.querySelector('#mySidenav').style.position = 'sticky';
            this.elementRef.nativeElement.querySelector('#mySidenav').style.left = '0';
            this.elementRef.nativeElement.querySelector('#mySidenav').style.marginLeft = '-300px';
            this.elementRef.nativeElement.querySelector('#main').style.marginLeft = '300px';
            this.sideNavStatus = false;
        } else {
            this.elementRef.nativeElement.querySelector('#mySidenav').style.width = '0';
            this.elementRef.nativeElement.querySelector('#mySidenav').style.position = 'absolute';
            this.elementRef.nativeElement.querySelector('#mySidenav').style.left = '-300px';
            this.elementRef.nativeElement.querySelector('#mySidenav').style.marginLeft = '0';
            this.elementRef.nativeElement.querySelector('#main').style.marginLeft = '0';
            this.sideNavStatus = true;
        }
        if (this.paramsData) {
            const topicIndex = this.paramsData.topicIndex;
            this.topicAccordion(topicIndex);
        } else {
            this.topicAccordion(1);
        }
    }

    topicAccordion(topicIndex) {
        this.elementRef.nativeElement.querySelector('#defaultAccordionTitle' + topicIndex).className += 'active';
        this.elementRef.nativeElement.querySelector('#defaultAccordionPanel' + topicIndex).style.maxHeight = 'inherit';
        const acc: any = this.elementRef.nativeElement.querySelectorAll('.accordion');
        // console.log(acc);
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

    categoryListing() {
        this.courseListingProxy.listCategoriesCourse(this.courseId)
            .subscribe((success: any) => {
                const categoryData = success.data;
                this.courseLearningData.push(categoryData);
                if (this.innerWidth > 768) {
                    setTimeout(() => {
                        this.openNav();
                    }, 100);
                } else {
                    this.sideNavStatus = false;
                    setTimeout(() => {
                        this.elementRef.nativeElement.querySelector('#mySidenav').style.width = '0';
                        this.elementRef.nativeElement.querySelector('#mySidenav').style.position = 'absolute';
                        this.elementRef.nativeElement.querySelector('#mySidenav').style.left = '-300px';
                        this.elementRef.nativeElement.querySelector('#mySidenav').style.marginLeft = '0';
                        this.elementRef.nativeElement.querySelector('#main').style.marginLeft = '0';
                        this.sideNavStatus = true;
                    }, 100);
                }
                this.currentTopicContent(this.paramsData, true);
            });
    }

    currentTopicContent(data, statusText, topicName?, topicIndex?) {
        this.chatForumsSection = false;
        let testStatus: boolean;
        const user = this.global.getStorageDetail('user').data;
        user.courseEnrolled.filter((userCourse) => {
            userCourse.timeline.filter((topic) => {
                topic.topics.filter((subTopics) => {
                    if (subTopics.subTopics === data.subTopics) {
                        if (subTopics.allQuestionsWithAnswer) {
                            testStatus = true;
                        } else {
                            testStatus = false;
                        }
                    }
                });
            });
        });
        if (data.questions) {
            if (data.questions.length >= 1) {
                if (testStatus) {
                    this.testBtnShow = false;
                } else {
                    this.testBtnShow = true;
                }
            }
        } else if (data.questionsLength) {
            if (data.questionsLength >= 1) {
                if (testStatus) {
                    this.testBtnShow = false;
                } else {
                    this.testBtnShow = true;
                }
            }
        } else {
            this.testBtnShow = false;
        }
        this.selectsubTopic = data.subTopics;
        this.subTopicContent = data;
        // this.editorContent = data.description;
        this.editorContent = data.description ? data.description:'No data present for this course.';//modified by nandita
        this.editorContent = this.sanitizer.bypassSecurityTrustHtml(this.editorContent);
        const courseObj = {
            'courseId': this.courseLearningData[0]._id,
            'courseName': this.courseLearningData[0].courseName,
            'topicIndex': (statusText) ? data.topicIndex : topicIndex,
            'topicName': (statusText) ? data.topicName : topicName,
            'subTopics': data.subTopics,
            'timing': data.timing,
            'order': data.order,
            'description': data.description,
            'questions': data.questions,
            'questionsLength': (data.questions) ? data.questions.length - 1 : 0,
            'testStatus': (statusText) ? data.testStatus : testStatus
        };
        this.global.storeDataLocal('courselearn', courseObj);
    }

    // Chat Forums Section
    chatForums() {
        this.chatForumsSection = true;
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
