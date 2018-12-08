import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class ProfilePageProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    userDetailsData(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/update-user-details', data, true);
    }

    userPic(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/upload', data, false);
    }

    changePassword(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/update-user-password', data, false);
    }

}
