import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class ListingCourseProxy {

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    listCategories() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-categories', false);
    }

    listCategoriesCourse(id) {
        return this.http.doGet(Constants.APIPATH + 'admin/list-categories-course/'+id, false);
    }

    getSSP() {
        return this.http.doGet(Constants.APIPATH + 'admin/get-ssp/' + 3, false);
    }

    updateSSPDiscountUsers(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/add-ssp', data, false);
    }

    getTrendingCourse() {
        return this.http.doGet(Constants.APIPATH + 'admin/trending-course');
    }

    getAllCourse() {
        return this.http.doGet(Constants.APIPATH + 'admin/all-courses');
    }

    getCategoryCourses(categoryId: any) {
        return this.http.doGet(Constants.APIPATH + 'admin/category-course-list/' + categoryId);
    }

}
