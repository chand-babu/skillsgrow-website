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

    forgotPwd(data){
        return this.http.doPost(Constants.APIPATH + Constants.COMPANY_FORGOT_PWD,data, false);
    }

    resendLink(data){
        return this.http.doPost(Constants.APIPATH + Constants.COMPANY_RESEND_LINK,data, false);
    }

}
