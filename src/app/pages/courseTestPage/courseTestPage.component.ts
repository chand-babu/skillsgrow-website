import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { Constants } from '../../common/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTestPageProxy } from './courseTestPage.proxy';
/* 8&e!^)tJ4^*M */
@Component({
    selector: 'app-course-test-page',
    templateUrl: './courseTestPage.component.html',
    providers: [CourseTestPageProxy]
})

export class CourseTestPageComponent implements OnInit {
    public categoryListData: any;
    public imagePath = Constants.IMAGEPATH;
    public questionobj = [];
    seconds: number;
    quesIndex: number = 1;
    allQuestion: any;
    selectedItem: number;
    public questionWithAnswer = [];
    userAnswer: any;
    public noOfQuestions = 0;
    userScore: any;
    public previousSelectedItem = [];
    questionAnswer = '';
    public paramsData: any;
    public testData: any;
    public showMark: boolean = false;
    public successMessage: boolean = false;
    public infoMessage: boolean = false;
    public message: any;
    public findQuestionNo: any;
    public passageAnswer = [];
    public questionNumber: any;
    public count = 0;
    public courseId: string; //added by nandita


    constructor(public global: Global, public activateRoute: ActivatedRoute,
        public router: Router, public courseTestProxy: CourseTestPageProxy) { }

    ngOnInit() {
        this.activateRoute.params.forEach(params => {
            this.courseId = params['id'];
        });//added by nandita
        this.paramsData = this.global.getStorageDetail('courselearn');
        if (!this.paramsData) {
            this.global.navigateToNewPage('/home');
        }
        const user = this.global.getStorageDetail('user').data;
        this.testData = this.paramsData;
        this.seconds = 0;
        // console.log("+++++this.paramsData++++++", this.paramsData);
        if (this.testData.questions.length >= 1) {
            this.allQuestion = this.testData.questions;
            this.questionIndex(0);
            this.findingthequestionsLength(this.testData);
        } else {
            this.successMessage = false;
            this.infoMessage = true;
            this.message = 'No Question in this Topic....redirecting to Home page';
            setTimeout(() => {
                this.global.navigateToNewPage('/home');
            }, 5000);
        }
        this.numberOfQuestions(0, 0);
    }

    timeElapsed() {
        return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
    }

    findingthequestionsLength(question) {
        question.questions.filter((ques) => {
            if (ques.questionStatus === '1') {
                this.noOfQuestions = this.noOfQuestions + ques.question.length;
            } else {
                this.noOfQuestions++;
            }
        });
    }

    questionIndex(index) {
        this.count = index;
        this.questionNumber = index;
        this.questionobj.push(this.testData.questions[index]);
        this.startTimer();
    }
    startTimer() {
        const time = setInterval(() => {
            this.seconds++;
        }, 1000);
    }

    answer(event, ans, index) {
        this.userAnswer = ans;
        this.infoMessage = false;
    }

    saveAndContinue(clicktype, index?) {
        const timetaken = this.timeElapsed();
        const findIndex = [];
        if (clicktype === 'btnClick') {
            if (this.userAnswer) {
                console.log("&&&&&", this.testData.questions.length ,'===', this.selectedItem + 1)
                if (this.testData.questions.length === this.selectedItem + 1) {
                    this.removeDuplicateObject(timetaken);
                    this.questionobj = [];
                    this.showMark = true;
                    this.markScore();
                } else {
                    this.removeDuplicateObject(timetaken);
                    this.userAnswer = '';
                    this.questionAnswer = '';
                    this.questionobj = [];
                    this.count = this.count + 1;
                    this.selectedItem = this.count;
                    this.questionIndex(this.selectedItem);
                }
            } else {
                this.infoMessage = true;
                this.message = 'Please choose an option to continue.';
            }
        } else {
            this.removeDuplicateObject(timetaken);
            this.seconds = 0;
            this.userAnswer = '';
            this.questionAnswer = '';
            this.questionobj = [];
            this.questionIndex(index);
        }
    }

    review(clicktype, index?) {
        const timetaken = this.timeElapsed();
        const findIndex = [];
        if (clicktype === 'btnClick') {
            if (this.testData.questions.length === this.selectedItem + 1) {
                this.removeDuplicateObject(timetaken);
                // this.questionobj = [];
                // this.showMark = true;
                // this.markScore();
            } else {
                this.removeDuplicateObject(timetaken);
                this.userAnswer = '';
                this.questionAnswer = '';
                this.questionobj = [];
                this.count = this.count + 1;
                this.selectedItem = this.count;
                this.questionIndex(this.selectedItem);
            }
        } else {
            this.removeDuplicateObject(timetaken);
            this.seconds = 0;
            this.userAnswer = '';
            this.questionAnswer = '';
            this.questionobj = [];
            this.questionIndex(index);
        }
    }//added by nandita

    numberOfQuestions(courseId, questionNumber) {
        this.selectedItem = questionNumber;
        this.questionNumber = questionNumber;
        this.saveAndContinue('normal', questionNumber);
        if (this.questionWithAnswer.length >= 1) {
            this.questionWithAnswer.filter((data) => {
                if (data.id === courseId.id) {
                    let array = [];
                    array.push(data);
                    this.questionobj = array;
                    array = [];
                    this.userAnswer = '';
                    this.questionAnswer = '';
                    this.questionAnswer = data.userAnswer;
                    this.userAnswer = this.questionAnswer;
                }
            });
        }
    }


    markScore() {
        let score = 0;
        let wrong = 0;
        this.questionWithAnswer.filter((data) => {
            if (data.questionStatus === '1') {
                data.question.filter((passageQues) => {
                    (passageQues.userAnswer !== passageQues.answer) ? wrong++ : score++;
                });
            } else {
                (data.userAnswer !== data.answer) ? wrong++ : score++;
            }
        });
        this.userScore = score;
        this.submitTheMarkInDb();
    }

    removeDuplicateObject(timetaken) {
        if (this.questionWithAnswer.length >= 1) {
            let noIdFind: boolean;
            this.questionWithAnswer.filter((data) => {
                if (data.id === this.questionobj[0].id) {
                    data.userAnswer = this.userAnswer;
                    data.timetaken = timetaken;
                    noIdFind = true;
                }
            });
            if (!noIdFind) {
                this.questionobj.filter((data) => {
                    data.userAnswer = this.userAnswer;
                    data.timetaken = timetaken;
                    this.questionWithAnswer.push(this.questionobj[0]);
                });
            }

        } else {
            this.questionobj.filter((data) => {
                // alert('id');
                data.userAnswer = this.userAnswer;
                data.timetaken = timetaken;
                this.questionWithAnswer.push(this.questionobj[0]);
            });
        }
        this.questionWithAnswer.filter((data) => {
            (data.userAnswer) ? this.allQuestion[data.id - 1].attendStatus = 'true' : this.allQuestion[data.id - 1].attendStatus = 'false';
        });
    }

    // getExtension(filename) {
    //     return (filename == 'png' || filename == 'jpg' || 
    //     filename == 'gif' || filename == 'jpeg' || 
    //     filename == 'JPG' || filename == 'PNG' || filename == undefined) ? true: false;
    // }

    getExtension(questionObj) {
        if (questionObj.imageQuestion) {
            let fileExt = questionObj.imageQuestion.split('.')[1];
            return (fileExt == 'png' || fileExt == 'jpg' ||
                fileExt == 'gif' || fileExt == 'jpeg' ||
                fileExt == 'JPG' || fileExt == 'PNG' || fileExt == undefined) ? 'image' : 'audio';
        }
    }//modified by nandita

    submitTheMarkInDb() {
        let i = 0;
        this.testData.markScore = this.userScore;
        this.testData.allQuestionsWithAnswer = this.questionWithAnswer;
        const user = this.global.getStorageDetail('user');
        user.data.courseEnrolled.filter((data) => {
            if (data._id === this.paramsData.courseId) {
                data.timeline.filter((title) => {
                    i = i + title.topics.length;
                    data.totalTopics = i;
                    if (title.title === this.paramsData.topicName) {
                        title.topics.filter((topic) => {
                            if (topic.subTopics === this.paramsData.subTopics) {
                                data.completedTopics = (data.completedTopics) ? data.completedTopics + 1 : 0 + 1;
                                data.currentScore = this.userScore + '/' + this.noOfQuestions;
                                data.currentTopic = this.paramsData.topicName;
                                data.questionsLength = this.noOfQuestions,
                                    topic.markScore = this.userScore;
                                topic.questionsLength = this.noOfQuestions;
                                topic.allQuestionsWithAnswer = this.questionWithAnswer;
                            }
                        });
                    }
                    data.courseProgress = data.completedTopics * 100 / data.totalTopics;
                    data.courseProgress = Math.round(data.courseProgress);
                });
            }
        });

        this.courseTestProxy.userScore({ userId: user.data._id, courses: user.data.courseEnrolled })
            .subscribe((success) => {
                console.log("***********",success)
            });
        const userData = this.global.storeDataLocal('user', user);
        this.global.deleteLocalData('courselearn');
    }

    goToDashboardPage() {
        // this.router.navigate(['enrollmentcourselandingpage', this.paramsData.courseId]);
        this.router.navigate(['enrollmentcourselandingpage', this.courseId]);// modified by nandita
    }

}
