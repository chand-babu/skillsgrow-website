import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../common/constants';
import { InternshipDataModel } from '../../../interface/intership';
import { HttpUtil } from '../../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class CompanyService {

    constructor(public http: HttpUtil) {}

    postInternship(data): Observable<InternshipDataModel> {
        return this.http.doPost(Constants.APIPATH + Constants.POST_INTERNSHIP,data, false);
    }

    uploadImage(data){
        return this.http.doPost(Constants.APIPATH + Constants.IMAGE_UPLOAD, data, false);
    }

    emailExist(data): Observable<InternshipDataModel> {
        return this.http.doGet(Constants.APIPATH + Constants.COMPANY_EMAIL_EXIST + '/' +data, false);
    }

}
