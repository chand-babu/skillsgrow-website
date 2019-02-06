import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../common/constants';
import { HttpUtil } from '../../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class ProfileService {

    constructor(public http: HttpUtil) {}

    updatePasswordCompany(data){
        return this.http.doPut(Constants.APIPATH + Constants.COMPANY_PASSWORD_CHANGE,data, false);
    }

    updateCompany(data){
        return this.http.doPut(Constants.APIPATH + Constants.COMPANY_UPDATE,data, false);
    }
}
