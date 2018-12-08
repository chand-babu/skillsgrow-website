import { Injectable } from '@angular/core';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class PublishSkillsgrowProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    PublishSkillsgrowFormData(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/publish-skillsgrow', data, true);
    }
}
