import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../common/constants';
import { HttpUtil } from '../../../common/http.util';
import 'rxjs/add/operator/map';

@Injectable()

export class CompanyLoginService {

    constructor(public http: HttpUtil) {}

    companyLogin(data) {
        return this.http.doPost(Constants.APIPATH + Constants.COMPANY_LOGIN,data, false);
    }

    // uploadImage(data){
    //     return this.http.doPost(Constants.APIPATH + Constants.IMAGE_UPLOAD, data, false);
    // }

}
