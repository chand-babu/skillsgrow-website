import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { InternshipDataModel } from '../../interface/intership';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()


export class InternshipService {

    constructor(public http: HttpUtil) {}

    listInternship(query){
        return this.http.doGet(Constants.APIPATH + Constants.POST_INTERNSHIP + query, false);
    }

    listCategory(){
        return this.http.doGet(Constants.APIPATH + Constants.CATEGORY , false);
    }
}
