import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../common/constants';
import { HttpUtil } from '../../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ActivateService {

    constructor(public http: HttpUtil) {}

    checkTokenValidService(data) {
        return this.http.doPost(Constants.APIPATH + Constants.COMPANY_ACTIVATION, data, false);
    }

    updateActiveStatus(data){
        return this.http.doPost(Constants.APIPATH + Constants.COMPANY_ACTIVE_STATUS, data, false);
    }
}
