import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AllCoursesProxy } from './allCourses.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../../common/global';
import { Constants } from '../../common/constants';

@Component({
    selector: 'app-all-courses',
    templateUrl: './allCourses.component.html',
    providers: [AllCoursesProxy]
})

export class AllCoursesComponent implements OnInit {
    public courseListData: any;
    public imagePath = Constants.IMAGEPATH;
    public courseTiming = 0;
    public course = [];
    public courseType: any;

    constructor(public allCoursesProxy: AllCoursesProxy, public activateRoute: ActivatedRoute,
        public global: Global, public router: Router) { }

    ngOnInit() {
        this.activateRoute.params.forEach(params => {
            this.courseType = params['type'];
        });
        this.categoryListingCourse();
    }

    categoryListingCourse() {
        this.allCoursesProxy.listCategories()
            .subscribe((success: any) => {
                console.log(success);
                this.courseListData = success.data;
                this.courseListData.filter((data) => {
                    data.course.filter((course) => {
                        if (data.course.length >= 1) {
                            this.course.push(course);
                        }
                        course.timeline.filter((timeline) => {
                            timeline.topics.filter((time) => {
                                if (!course.timing) {
                                    this.courseTiming = this.courseTiming + time.timing;
                                    course.timing = this.courseTiming;
                                    this.courseTiming = 0;
                                } else {
                                    course.timing = course.timing + time.timing;
                                }
                            });
                        });
                    });
                });
                this.convertMinuteInTime(this.courseListData);
                console.log(this.course);
                this.checkTheUrlTypes(this.course);
        });
    }

    checkTheUrlTypes(course) {
        if (this.courseType === 'allCourses') {
            course.sort(this.compare);
        } else if (this.courseType === 'freeCourses') {
            course.filter((data) => {
                if (data.authorDetails.coursePrice === 'Free') {
                    course.push(data);
                }
            });
        } else if (this.courseType === 'latestCourse') {
            course.sort(this.dateWiseSorting);
        } else if (this.courseType === 'ratingCourses') {}
    }

    dateWiseSorting(a, b) {
        const dateA: any = new Date(a.createdOn);
        const dateB: any = new Date(b.createdOn);
        return dateB - dateA;
    }

    compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const genreA = a.courseName.toUpperCase();
        const genreB = b.courseName.toUpperCase();

        let comparison = 0;
        if (genreA > genreB) {
            comparison = 1;
        } else if (genreA < genreB) {
            comparison = -1;
        }
        return comparison;
    }


    convertMinuteInTime(data) {
        data.filter((courseListData) => {
            courseListData.course.filter((timing) => {
                const h = Math.floor(timing.timing / 60);
                const m = timing.timing % 60;
                const hr = h < 10 ? '0' + h : h;
                const min = m < 10 ? '0' + m : m;
                timing.timing = hr + ':' + min;
            });
        });
    }

    viewDetailsCourse(id: number) {
        this.router.navigate(['/coursedetailspage', id]);
    }

    enrollNowCourse(x) {
        if (!this.global.getStorageDetail('user')) {
            this.global.navigateToNewPage('/login');
        } else {
            const courseObj = {
                courseId: x._id,
                courseTiming: x.timing,
                courseRating: '',
                courseChapter: x.timeline.length,
                videoUrl: x.video,
                courseImage: x.imageLarge
            };
            this.global.storeDataLocal('currentCourseData', courseObj);
            this.router.navigate(['/enrollmentpage', x._id]);
        }

    }
}
