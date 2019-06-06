import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class BlogProxy {
    private history = [];

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) { }

    getblogDetails() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-blog', false);
    }

    getCategoriesTitle(){
        return this.http.doGet(Constants.APIPATH + 'admin/list-categoriesInBlogPage', false);
    }
    
    getblogDetailsBasedOnCategory(categoryId){
        return this.http.doGet(Constants.APIPATH + 'admin/findBlogsByCategory/' + categoryId, false);
    }

}
