import { Injectable } from '@angular/core';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class ContactEnterpriseteamProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    enterpriseTeamFormData(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/contact-enterprise-team', data, true);
    }

}
