import { Injectable } from '@angular/core';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class ResponseProxy {

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    payuResponseData(id) {
        return this.http.doGet(Constants.APIPATH + 'admin/payu-response-get/' + id, true);
    }

    certificatePaymentService(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/payu-certificate-payment', data, true);
    }

}
