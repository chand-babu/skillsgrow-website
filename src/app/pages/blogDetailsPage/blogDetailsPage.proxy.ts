import { Injectable } from '@angular/core';
import { Constants } from './../../common/constants';
import { HttpUtil } from './../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class BlogDetailsPageProxy {

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) { }

    getblogDetails() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-blog', false);
    }

    getCategoriesTitle() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-categoriesInBlogPage', false);
    }

    getBlogDataByName(blogName) {
        return this.http.doGet(Constants.APIPATH + 'admin/findBlogByName/' + blogName, false);
    }

    storeBlogMessage(messageDetails) {
        return this.http.doPost(Constants.APIPATH + 'admin/storeBlogComment', messageDetails, false);
    }

    getCommentMessageOfBlog(blogId){
        return this.http.doGet(Constants.APIPATH + 'admin/getCommentMessageOfBlog/' + blogId, false);
    }

    getblogDetailsBasedOnCategory(categoryId) {
        return this.http.doGet(Constants.APIPATH + 'admin/findBlogsByCategory/' + categoryId, false);
    }
}
