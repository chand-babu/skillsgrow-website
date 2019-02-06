import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()


export class InternshipService {

    constructor(public http: HttpUtil) {}

    listInternship(query){
        return this.http.doGet(Constants.APIPATH + Constants.POST_INTERNSHIP + query, false);
    }

    listCategory(value){
        return this.http.doGet(Constants.APIPATH + Constants.CATEGORY + '/' + value , false);
    }

    uploadResume(data){
        return this.http.doPost(Constants.APIPATH + Constants.RESUME_UPLOAD, data, false);
    }

    applyInternship(data){
        return this.http.doPost(Constants.APIPATH + Constants.COMPANY_APPLY_INTERNSHIP, data, false);
    }


}
