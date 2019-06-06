import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class CourseDetailsPageProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    courseReviewService(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/course-review', data, true);
    }

    discussionForumsService(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/discussion-forums', data, true);
    }

    getDiscussionForumsService(courseId) {
        return this.http.doGet(Constants.APIPATH + 'admin/discussion-forums/' + courseId, false);
    }

    getCourseData(courseId) {
        return this.http.doGet(Constants.APIPATH + 'admin/course/' + courseId, false);
    }

    getCourseDataByName(courseName) {
        return this.http.doGet(Constants.APIPATH + 'admin/findCourseByName/' + courseName, false);
    }//added by nandita

    updateHourSpendPerCourse(data){
        return this.http.doPost(Constants.APIPATH + 'admin/storeSpendTimePerCourse', data, false);
    }

    findHourSpendPerCourse(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/getSpendTimePerCourse', data, false);
    }

    getbestScoreBasedonCourseId(courseId){
        return this.http.doGet(Constants.APIPATH + 'admin/findBestScoreBaseOnCourseId/' + courseId, false);
    }

    getHourSpendAllactiveCourse(data){
        return this.http.doPost(Constants.APIPATH + 'admin/getSpendTimeOfactiveCourse', data, false);
    }

}
