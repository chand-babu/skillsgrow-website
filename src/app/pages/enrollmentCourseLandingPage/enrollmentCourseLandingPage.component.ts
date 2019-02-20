import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Constants } from '../../common/constants';
import { ListingCourseProxy } from '../../components/course-listing/course-listing.proxy';
import * as html2canvas from 'html2canvas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseListingComponent } from 'src/app/components/all';

@Component({
    selector: 'app-enrollemnt-page',
    templateUrl: './enrollmentCourseLandingPage.component.html',
    providers: [ListingCourseProxy]
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

    constructor(public global: Global, public activateRoute: ActivatedRoute,
        public router: Router, public courseListProxy: ListingCourseProxy,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        let hourSpent = this.global.getStorageDetail('timetaken');
        hourSpent = hourSpent / 60;
        hourSpent = Math.round(hourSpent);
        this.activateRoute.params.forEach(params => {
            this.courseId = params['id'];
        });
        this.userDetails = this.global.getStorageDetail('user').data;
        this.userDetails.courseEnrolled.filter((data) => {
            if (data._id === this.courseId) {
                this.courseListData = data;
                this.updateCourseData(this.courseId, this.courseListData);
            }
        });
        this.courseListData.timeline.filter((timeline) => {
            timeline.topics.filter((topic) => {
                if (topic.markScore) {
                    const score = topic.markScore * 100 / topic.questions.length - 1;
                    this.averageCourseScore = this.averageCourseScore + score / 2;
                }
            });
        });
        this.progressObj = [
            {
                width: this.courseListData.courseProgress,
                color: '#38baae',
                title: this.courseListData.courseName
            },
            {
                width: Math.floor(this.averageCourseScore),
                color: '#0d88aa',
                title: 'Score',
            },
            {
                width: '100', // hourSpent,
                color: '#F7941D',
                title: 'Hours Spent',
                sampleTitle: '0'
            },
            {
                width: this.courseListData.courseProgress,
                color: '#ff505d',
                title: 'Progress'
            }
        ];
        this.accordin(event, 0);
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
                                if (courseData.timeline[chapterIndex]) {
                                    if (chapter.title === courseData.timeline[chapterIndex].title) {
                                        chapter.topics.filter((topicsDescription, topicIndex) => {
                                            // console.log("++++++---topicIndex---++++++", topicIndex,'====', courseData.timeline[chapterIndex].topics[topicIndex]) //need to check    
                                        courseData.timeline[chapterIndex].topics[topicIndex].description = topicsDescription.description;
                                        courseData.timeline[chapterIndex].topics[topicIndex].questions = topicsDescription.questions;
                                        });
                                    } else {
                                        courseData.timeline.push(chapter);
                                        courseData.timeline.splice(chapterIndex, 1);
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
                            });
                        }
                    });
                });
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

    openLg(content) {
        this.modalService.open(content);
    }

}
