import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ListingCourseProxy } from './course-listing.proxy';
import { Router } from '@angular/router';
import { Global } from '../../common/global';
import { Constants } from '../../common/constants';
import { DataService } from 'src/app/common/data.service';

@Component({
  selector: 'app-course-listing',
  templateUrl: './course-listing.component.html',
  providers: [ListingCourseProxy],
})

export class CourseListingComponent implements OnInit {
  public imagePath = Constants.IMAGEPATH;
  public courseTiming = 0;
  public user: any;
  public enrollBtn: boolean = true;
  public averageRating = 0;
  public rate: number;
  slideConfig = { 'slidesToShow': 4, 'slidesToScroll': 4 };
  public popularCourse = [];

  constructor(public listingCourseProxy: ListingCourseProxy, public router: Router,
    public global: Global, public el: ElementRef, public courseDataService: DataService) { }


  ngOnInit() {
    this.user = this.global.getStorageDetail('user');
    if (this.user) {
      this.user = this.global.getStorageDetail('user').data;
    }
    this.getCourse();
  }

  getCourse() {
    this.listingCourseProxy.getCourse()
    .subscribe((success: any) => {
      this.popularCourse = success.data;
      this.courseCalculation();
      this.convertMinuteInTime(this.popularCourse);
    })
  }

  afterChange(e) {
    console.log('afterChange');
  }

  courseCalculation() {
    this.popularCourse.filter((course) => {
      if (this.user) {
        if (course.authorDetails[0].coursePrice !== 'Free') {
          if (this.user.referId || this.user.status === 3) {
            course.authorDetails[0].coursePrice = course.authorDetails[0].coursePrice - course.authorDetails[0].coursePrice * 10 / 100;
          }
        }
        if (course.enrolledUser.length >= 1) {
          course.enrolledUser.filter((email) => {
            if (email.userEmailId === this.user.emailId) {
              course.enrollBtn = false;
            }
          });
        }
      }
      this.averageCourseReview(course);
    });
  }

  averageCourseReview(course) {
    if (course.courseReview.length >= 1) {
      course.courseReview.filter((review) => {
        if (!course.ratings) {
          this.averageRating = this.averageRating + review.rating;
          course.ratings = this.averageRating;
          this.averageRating = 0;
        } else {
          course.ratings = course.ratings + review.rating;
        }
      });
      course.ratings = course.ratings / course.courseReview.length;
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
  }

  convertMinuteInTime(data) {
    data.filter((timing) => {
      const h = Math.floor(timing.timing / 60);
      const m = timing.timing % 60;
      const hr = h < 10 ? '0' + h : h;
      const min = m < 10 ? '0' + m : m;
      timing.timing = hr + ':' + min;
    });
  }

  viewDetailsCourse(id: number) {
    this.router.navigate(['/coursedetailspage', id]);
  }

  enrollNowCourse(courseData) {
    if (courseData.enrollBtn === undefined) {
      if (!this.global.getStorageDetail('user')) {
        this.global.navigateToNewPage('/login');
      } else {
        const courseObj = {
          courseId: courseData._id,
          courseFee: courseData.authorDetails[0].coursePrice,
          certificateFee: courseData.authorDetails[0].certificatePrice,
          courseName:  courseData.courseName,
          courseImage:  courseData.imageLarge,
          courseTiming: courseData.timing,
          ratings: courseData.ratings,
          courseChapter: courseData.timeline.length,
          videoUrl: courseData.video
        };
        this.courseDataService.containCourseData(courseObj);
        this.router.navigate(['/enrollmentpage', courseData._id]);
      }
    } else {
      this.router.navigate(['/enrollmentcourselandingpage', courseData._id]);
    }
  }

}
