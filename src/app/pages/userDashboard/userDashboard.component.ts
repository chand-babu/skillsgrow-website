import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../../common/global';
import { ListingCourseProxy } from '../../components/course-listing/course-listing.proxy';
import { Constants } from '../../common/constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/* import * as jsPDF from 'jspdf'; */
import * as html2canvas from 'html2canvas';
import * as jsSHA from 'jssha';
import { SEOService } from './../../common/seo.service';
import { CourseDetailsPageProxy } from '../courseDetailsPage/courseDetailsPage.proxy';


@Component({
    selector: 'app-user-dashboard',
    templateUrl: './userDashboard.component.html',
    providers: [ListingCourseProxy, CourseDetailsPageProxy]
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
    public activeCourseIds = [];
    public totalHourSpentInAllActiveCourse = 0;
    public noOfQuestions = 0;
    public user: any;

    onLoad() {
        this.isImgLoaded = false;
    }


    constructor(public coursedetailspageProxy: CourseDetailsPageProxy, public router: Router, public global: Global,
        public listingCourseProxy: ListingCourseProxy, private modalService: NgbModal, public seoService: SEOService) { }

    @ViewChild('SSPChangePassword') SSPChangePassword: ElementRef;

    ngOnInit() {
        this.user = this.global.getStorageDetail('user');
        if (this.user) {
            this.user = this.global.getStorageDetail('user').data;

            this.seoService.updateTitle("Dashboard");
            this.userDetails = this.global.getStorageDetail('user').data;
            if (this.userDetails.loginStatus === 0) {
                setTimeout(() => {
                    this.modalService.open(this.SSPChangePassword);
                }, 2000);
            }
            this.activeCourses = this.userDetails.courseEnrolled;
            // console.log('this.activeCourses', this.activeCourses)
            let activeCourseProgress = 0;
            // if (this.activeCourses.length >= 1) {
            //     this.activeCourses.filter((data) => {
            //         this.activeCourseIds.push(data._id);
            //         activeCourseProgress = (data.courseProgress) ? data.courseProgress + activeCourseProgress : activeCourseProgress + 0;
            //         if (data.courseProgress === 100) {
            //             this.certificateCount++;
            //         } else {
            //             this.activeCoursesCount++;
            //         }
            //     });
            //     activeCourseProgress = activeCourseProgress / this.activeCourses.length;
            //     activeCourseProgress = Math.round(activeCourseProgress);
            //     // activeCourseProgress = this.activeCoursesCount * 100 / this.activeCourses.length;
            //     // activeCourseProgress = Math.round(activeCourseProgress);
            //     // console.log(activeCourseProgress);
            //     this.timeTakeInCourse = this.global.getStorageDetail('timeTaken');
            //     this.timeTakeInCourse = this.timeTakeInCourse / 60;
            //     this.timeTakeInCourse = Math.round(this.timeTakeInCourse);
            // console.log(this.timeTakeInCourse);
            // }
            //===========================
            if (this.activeCourses.length >= 1) {
                this.activeCourses.filter((activeCourseData) => {
                    this.updateCourseData(activeCourseData._id, activeCourseData);
                    this.activeCourseIds.push(activeCourseData._id);
                    activeCourseProgress = (activeCourseData.courseProgress) ? activeCourseData.courseProgress + activeCourseProgress : activeCourseProgress + 0;
                    if (activeCourseData.courseProgress === 100) {
                        this.certificateCount++;
                    } else {
                        this.activeCoursesCount++;
                    }
                });

                // activeCourseProgress = activeCourseProgress / this.activeCourses.length;
                // activeCourseProgress = Math.round(activeCourseProgress);

            }


            //hour spent code
            let info = {
                userId: this.global.getStorageDetail('user').data._id,
                courseIds: this.activeCourseIds
            }

            this.coursedetailspageProxy.getHourSpendAllactiveCourse(info)
                .subscribe((success: any) => {
                    // console.log("=======findHourSpendPerCourse=====", typeof success.data.totalSpentHours, typeof success.data.totalCourseHours)
                    if (success.data.totalSpentHours > 0 || success.data.totalCourseHours > 0) {
                        this.totalHourSpentInAllActiveCourse = ((success.data.totalSpentHours / 60) * 100) / success.data.totalCourseHours;
                        this.totalHourSpentInAllActiveCourse = Math.round(this.totalHourSpentInAllActiveCourse);
                        // console.log('this.activeCourses.length', this.activeCourses.length)
                        // console.log('this.activeCoursesCount', this.activeCoursesCount)
                    }


                    this.progressObj = [
                        {
                            width: '100',
                            color: '#0d88aa',
                            // title: 'Courses',
                            title: 'Courses Enrolled',
                            sampleTitle: (this.activeCourses.length).toString()
                        },
                        {
                            width: '100',
                            // width: activeCourseProgress,
                            color: '#F7941D',
                            title: 'Active Courses',
                            sampleTitle: (this.activeCoursesCount).toString()// activeCourseProgress
                        },
                        {
                            width: '100',
                            color: '#38baae',
                            title: 'Certificates',
                            sampleTitle: (this.certificateCount) ? this.certificateCount : '0'
                        },
                        {
                            // width: '100',
                            width: this.totalHourSpentInAllActiveCourse,
                            color: '#ff505d',
                            title: 'Total Hours',
                            // sampleTitle: '0' // (this.timeTakeInCourse === undefined) ? '0' : this.timeTakeInCourse + 'min'
                        }
                    ];
                });






            // this.progressObj = [
            //     {
            //         width: '100',
            //         color: '#38baae',
            //         title: 'Certificates',
            //         sampleTitle: (this.certificateCount) ? this.certificateCount : '0'
            //     },
            //     {
            //         width: '100',
            //         color: '#0d88aa',
            //         title: 'Courses',
            //         sampleTitle: this.activeCourses.length
            //     },
            //     {
            //         width: '100',
            //         // width: activeCourseProgress,
            //         color: '#F7941D',
            //         title: 'Active Courses',
            //         sampleTitle: this.activeCoursesCount// activeCourseProgress
            //     },
            //     {
            //         width: '100',
            //         color: '#ff505d',
            //         title: 'Total Hours',
            //         sampleTitle: '0' // (this.timeTakeInCourse === undefined) ? '0' : this.timeTakeInCourse + 'min'
            //     }
            // ];

            this.SSPMembers();
        }else{
            this.global.navigateToNewPage('/login');
        }
    }

    updateCourseData(activeCourseId, activeCourseData) {
        let totalQuesLengthOfCourse = 0;
        this.listingCourseProxy.listCategories()
            .subscribe((success: any) => {
                const categoryData = success.data;
                categoryData.filter((allCourse) => {
                    allCourse.course.filter((course) => {
                        if (activeCourseId === course._id) {
                            // console.log("++++++++++++courseId============", activeCourseId);
                            activeCourseData.imageLarge = course.imageLarge;
                            activeCourseData.imageSmall = course.imageSmall;
                            activeCourseData.video = course.video;
                            activeCourseData.courseName = course.courseName;

                            course.timeline.filter((chapter, chapterIndex) => {
                                let finalTimelineLength = 0;
                                if (course.timeline.length > activeCourseData.timeline.length) {
                                    finalTimelineLength = course.timeline.length;
                                } else {
                                    finalTimelineLength = activeCourseData.timeline.length;
                                }
                                let j = 0;
                                for (let i = 0; i < finalTimelineLength; i++) {
                                    let k = 0;
                                    if (finalTimelineLength == course.timeline.length) {
                                        k = chapterIndex;
                                    } else {
                                        k = i - j;
                                    }
                                    if (activeCourseData.timeline[k]) {
                                        if (chapter.title === activeCourseData.timeline[k].title) {
                                            chapter.topics.filter((topicsDescription, topicIndex) => {
                                                activeCourseData.timeline[k].topics[topicIndex].description = topicsDescription.description;
                                                activeCourseData.timeline[k].topics[topicIndex].questions = topicsDescription.questions;
                                            });
                                        } else {
                                            if (chapterIndex == i) {
                                                activeCourseData.timeline.push(chapter);
                                            }
                                            activeCourseData.timeline.splice(k, 1);
                                        }
                                    } else {
                                        activeCourseData.timeline.push(chapter);
                                    }

                                    activeCourseData.timeline.map((topic) => {
                                        topic.topics.filter((question) => {
                                            const alreadyAttendQuestion = question.allQuestionsWithAnswer;
                                            if (alreadyAttendQuestion) {
                                                question.questionsLength = this.findingQuestionLength(alreadyAttendQuestion);
                                            } else {
                                                const questions = question.questions;
                                                question.questionsLength = this.findingQuestionLength(questions);
                                            }
                                        });
                                    });
                                    j++;
                                }
                            });
                        }
                    });
                });
                activeCourseData.timeline.map((topic) => {
                    topic.topics.filter((subTopicsData) => {
                        //=================
                        if (subTopicsData.subTopics === activeCourseData.currentTopic) {
                            activeCourseData.currentTopic = activeCourseData.currentTopic;
                            activeCourseData.currentScore = activeCourseData.currentScore;
                        } else {
                            activeCourseData.currentTopic = '';
                            activeCourseData.currentScore = '';
                        }
                        //==================
                        if (subTopicsData.questions) {
                            subTopicsData.questions.filter((singleQuestion) => {
                                if (singleQuestion.questionStatus == '1') {
                                    totalQuesLengthOfCourse += (singleQuestion) ? singleQuestion.question.length : 0;
                                } else {
                                    totalQuesLengthOfCourse++;
                                }
                            });
                        }
                        //===================
                    })
                });
                activeCourseData.totalQuesLengthOfCourse = totalQuesLengthOfCourse;
                if (activeCourseData.totalQuesLengthOfCourse == 0) {
                    activeCourseData.courseProgress = 0;
                }
            });
    }

    // finding questions length
    findingQuestionLength(question) {
        this.noOfQuestions = 0;
        if (question) {
            question.filter((ques) => {
                if (ques.questionStatus === '1') {
                    this.noOfQuestions = this.noOfQuestions + ques.question.length;
                } else {
                    this.noOfQuestions++;
                }
            });
        } else {
            this.noOfQuestions = 0;
        }
        return this.noOfQuestions;
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

    // viewDetailsCourse(id: number) {
    //     this.router.navigate(['/coursedetailspage', id]);
    // }

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
        // this.amount = 100; // amount;
        this.amount = amount; // amount;
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
