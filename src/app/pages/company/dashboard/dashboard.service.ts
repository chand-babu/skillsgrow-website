import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../common/constants';
import { HttpUtil } from '../../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class DashboardService {

    constructor(public http: HttpUtil) {}

    listInternshipPost(data) {
        return this.http.doGet(Constants.APIPATH + Constants.POST_INTERNSHIP +'/' + data, false);
    }

    listAppliedInternshipPost(data) {
        return this.http.doGet(Constants.APIPATH + Constants.COMPANY_LIST_APPLY_INTERNSHIP +'/' + data, false);
    }

    internshipPost(data) {
        return this.http.doPost(Constants.APIPATH + Constants.COMPANY_POST_INTERNSHIP, data, false);
    }
}
