import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Constants } from '../../common/constants';
import { ListingCourseProxy } from '../../components/course-listing/course-listing.proxy';
import * as html2canvas from 'html2canvas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseListingComponent } from '../../components/all';
import { SEOService } from './../../common/seo.service';
import { CourseDetailsPageProxy } from '../courseDetailsPage/courseDetailsPage.proxy';
import * as jsSHA from 'jssha';


@Component({
    selector: 'app-enrollemnt-page',
    templateUrl: './enrollmentCourseLandingPage.component.html',
    providers: [ListingCourseProxy, CourseDetailsPageProxy]
})

export class EnrollmentCourseLandingPageComponent implements OnInit {
    public topics: boolean = true;
    public dummy = ['1', '2', '3', '4'];
    public selectedItem;
    public progressObj: any[];
    public imagePath = Constants.IMAGEPATH;
    public courseId: any;
    public courseListData: any;
    public averageCourseScore = 0;
    public noOfQuestions = 0;
    public getCanvas: any;
    public userDetails: any;

    public hash: any;
    public paidCertificate: boolean = false;
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
    public courseHighestScore: number = 0;
    public totalCourseTime: number;
    public totalQes: number;
    public hourSpent: number = 0;
    public hourSpentType: any;
    public totalQesLength: number = 0;
    public totalCorrectAns: number = 0;
    public userHighestScore: number = 0;
    public userCompletedQues: number = 0;
    public studentsAttenedTest: number = 0;


    constructor(public coursedetailspageProxy: CourseDetailsPageProxy, public global: Global, public activateRoute: ActivatedRoute,
        public router: Router, public courseListProxy: ListingCourseProxy,
        private modalService: NgbModal, public seoService: SEOService) {
    }

    ngOnInit() {
        this.seoService.updateTitle('Skillsgrow');

        // let hourSpent = this.global.getStorageDetail('timetaken');
        // hourSpent = hourSpent / 60;
        // hourSpent = Math.round(hourSpent);
        this.activateRoute.params.forEach(params => {
            this.courseId = params['id'];
        });
        this.userDetails = this.global.getStorageDetail('user').data;
        this.userDetails.courseEnrolled.filter((data) => {
            if (data._id === this.courseId) {
                this.courseListData = data;
                // console.log("+++++++++++++this.courseListData+++++++++++++++", this.courseListData)
                // console.log("+++++++++++++this.courseListData+++++++++++++++", this.courseListData.timeline.length)
                this.seoService.updateTitle("Course - " + (this.courseListData.courseName).toLowerCase());
                this.updateCourseData(this.courseId, this.courseListData);
            }
        });

        this.accordin(event, 0); //need to check issue came in firefox
    }

    accordin(event, newValue) {
        if (this.topics) {
            this.topics = false;
            this.selectedItem = newValue;
        } else {
            this.topics = true;
            this.selectedItem = -1;
        }
    }

    afterUpdateCourseData() {
        this.courseListData.timeline.filter((timeline) => {
            timeline.topics.filter((topic) => {
                if (topic.questions) {
                    topic.questions.filter((question) => {
                        if (question.questionStatus == '1') {
                            this.totalQesLength += (question) ? question.question.length : 0;
                        } else {
                            this.totalQesLength++;
                        }
                    });
                }

                if (topic.markScore) {
                    // console.log("++++++topic+++++", topic);
                    // const score = topic.markScore * 100 / topic.questions.length - 1;
                    // this.averageCourseScore = this.averageCourseScore + score / 2;
                    this.userCompletedQues += topic.questionsLength;
                    this.totalCorrectAns += topic.markScore;
                    if (topic.markScore > this.userHighestScore) {
                        this.userHighestScore = topic.markScore;
                    }
                }
            });
        });


        //best score calculate code
        this.coursedetailspageProxy.getbestScoreBasedonCourseId(this.courseId)
            .subscribe((success: any) => {
                // console.log("===getbestScoreBasedonCourseId====", success);
                this.courseHighestScore = success.data.highestScore;
                this.totalCourseTime = success.data.totalTimeForCourse;
                this.totalQes = success.data.totalQes;
                this.studentsAttenedTest = success.data.attendTestUser;

                //hour spent code
                let info = {
                    userId: this.global.getStorageDetail('user').data._id,
                    courseId: this.courseId
                }
                this.coursedetailspageProxy.findHourSpendPerCourse(info)
                    .subscribe((success: any) => {
                        if (success.result == true) {

                            if (success.data) {
                                // console.log(success.data.hourSpent, "==hoursSpent type===", typeof success.data.hourSpent, '====course time====', this.totalCourseTime)
                                this.hourSpentType = typeof success.data.hourSpent;
                                if (this.hourSpentType != 'undefined') {
                                    this.hourSpent = success.data.hourSpent / 60;
                                    this.hourSpent = this.hourSpent * 100 / this.totalCourseTime;
                                    this.hourSpent = Math.round(this.hourSpent);
                                }
                            }

                            let bestScoreTitle = (this.courseHighestScore > 0 && this.totalQesLength > 0) ? (this.courseHighestScore).toString() + '/' + (this.totalQesLength).toString() : '0';

                            // console.log('this.hourSpent', this.hourSpent)
                            // console.log('userCompletedQues', this.userCompletedQues)

                            this.progressObj = [
                                // {
                                //     width: this.courseListData.courseProgress,
                                //     color: '#38baae',
                                //     title: this.courseListData.courseName
                                // },
                                {
                                    width: (this.totalQesLength > 0)?this.courseListData.courseProgress:'0',
                                    // width: this.testAvarageCalculate,
                                    color: '#ff505d',
                                    title: 'Progress Overview'
                                },
                                {
                                    // width: Math.floor(this.averageCourseScore),
                                    width: '100',
                                    color: '#0d88aa',
                                    title: 'Course Best Score',
                                    sampleTitle: bestScoreTitle
                                },
                                {
                                    // width: '100', // hourSpent,
                                    width: this.hourSpent, // hourSpent,
                                    color: '#F7941D',
                                    title: 'Hours Spent',
                                    // sampleTitle: hourSpent.toString()
                                },
                                {
                                    width: 100,
                                    color: '#0d88aa',
                                    title: 'Questions Answered',
                                    sampleTitle: (this.totalQesLength).toString()
                                },
                                {
                                    width: 100,
                                    color: '#F7941D',
                                    title: 'Correctly Answered',
                                    sampleTitle: (this.totalCorrectAns).toString()
                                },
                                {
                                    width: 100,
                                    color: '#ff505d',
                                    title: 'My Score',
                                    // sampleTitle: (this.userHighestScore).toString() + '/' + (this.userCompletedQues).toString()
                                    sampleTitle: (this.totalCorrectAns).toString() + '/' + (this.userCompletedQues).toString()
                                },
                                {
                                    width: 100,
                                    color: '#F7941D',
                                    title: 'Students Currently Practicing',
                                    sampleTitle: (this.studentsAttenedTest).toString()
                                }
                            ];

                        }
                    });
                //===========



            });
        //==========
    }

    learningPageUrl(data, topicName, topicIndex) {
        let status: boolean;
        if (data.markScore || data.markScore === 0) {
            status = true;
        } else {
            status = false;
        }
        const courseObj = {
            'courseId': this.courseId,
            'courseName': this.courseListData.courseName,
            'topicName': topicName,
            'subTopics': data.subTopics,
            'questions': data.questions,
            'timing': data.timing,
            'order': data.order,
            'description': data.description,
            'questionsLength': (data.questions) ? data.questions.length - 1 : 0,
            'testStatus': status,
            'topicIndex': topicIndex
        };
        this.global.storeDataLocal('courselearn', courseObj);
        this.router.navigate(['courselearningpage', this.courseId]);
    }

    updateCourseData(id, courseData) {
        this.courseListProxy.listCategories()
            .subscribe((success: any) => {
                const categoryData = success.data;
                categoryData.filter((allCourse) => {
                    allCourse.course.filter((course) => {
                        if (id === course._id) {
                            courseData.imageLarge = course.imageLarge;
                            courseData.imageSmall = course.imageSmall;
                            courseData.video = course.video;
                            courseData.courseName = course.courseName;

                            course.timeline.filter((chapter, chapterIndex) => {
                                let finalTimelineLength = 0;
                                if (course.timeline.length > courseData.timeline.length) {
                                    finalTimelineLength = course.timeline.length;
                                } else {
                                    finalTimelineLength = courseData.timeline.length;
                                }
                                let j = 0;
                                for (let i = 0; i < finalTimelineLength; i++) {
                                    let k = 0;
                                    if (finalTimelineLength == course.timeline.length){
                                        k = chapterIndex;
                                    }else{
                                        k = i-j;
                                    }
                                    if (courseData.timeline[k]) {
                                        if (chapter.title === courseData.timeline[k].title) {
                                            chapter.topics.filter((topicsDescription, topicIndex) => {
                                                courseData.timeline[k].topics[topicIndex].description = topicsDescription.description;
                                                courseData.timeline[k].topics[topicIndex].questions = topicsDescription.questions;
                                            });
                                        } else {
                                            if (chapterIndex == i) {
                                                courseData.timeline.push(chapter);
                                            }
                                            courseData.timeline.splice(k, 1);
                                        }
                                    } else {
                                        courseData.timeline.push(chapter);
                                    }
                                    courseData.timeline.map((topic) => {
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

                // console.log("=============courseData============", courseData)
                this.afterUpdateCourseData();
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

    previewImage(content, courseName) {
        this.modalService.open(content, { size: 'lg' });
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

    // openLg(content) {
    //     this.modalService.open(content);
    // }

    openLg(content, courseData, amount, index) {
        // console.log(index);
        this.paidCertificate = true;
        this.modalService.open(content);
        this.random = new Date();
        this.txid = this.random.valueOf();
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
