import { Component, ViewChildren, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { SEOService } from './../../common/seo.service';
import { BlogDetailsPageProxy } from './blogDetailsPage.proxy';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { SafePipe } from '../../common/videourl.component';
import { Constants } from '../../common/constants';
import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-blog-details-page',
    templateUrl: './blogDetailsPage.component.html',
    providers: [BlogDetailsPageProxy, SafePipe],
})

export class BlogDetailsPageComponent implements OnInit {

    public imagePath = Constants.IMAGEPATH;
    public blogDetails = [];
    public blogTitles = [];
    public categoriesTitle = [];
    blog = [];
    model: any;
    public blogName: string;
    public categoryName: string;
    public blogMessageForm = {
        userName: '',
        userEmail: '',
        userWebsiteUrl: '',
        userMessage: '',
        active: false
    };
    public blogId: any;

    public commentsOfThisBlog = [];
    public replayUserName: boolean = false;
    public parentUserName: any;
    public parentUserIdOfMessage: any;
    public isImgLoaded: boolean = true;
    onLoad() {
        this.isImgLoaded = false;
    }
    @ViewChildren('textarea') vc;
    @ViewChildren('commentSection') commentSection;


    constructor(public videourl: SafePipe, private sanitizer: DomSanitizer, public blogDetailsProxy: BlogDetailsPageProxy,
        public global: Global, public activateRoute: ActivatedRoute, public router: Router,
        public seoService: SEOService) {
        activateRoute.params.subscribe(val => {
            // put the code from `ngOnInit` here bcz Router Navigate does not call ngOnInit when same page
            this.blogDataByName(this.global.convertDashesString(val.name));
            this.blogTitles = [];
        });
    }

    ngOnInit() {
        this.blogData();
    }

    blogData() {
        this.blogDetailsProxy.getblogDetails()
            .subscribe((success: any) => {
                if (success.result == true) {
                    success.data.filter((blogData) => {
                        blogData.blogNameUrl = this.global.MakeStringToDashes(blogData.blogName);
                        this.blog.push(blogData);
                    });
                } else {
                    this.global.navigateToNewPage('/errorpage');
                }
            });
    }

    blogDataByName(name: string) {
        // console.log('=======name=========', name);
        this.blogDetailsProxy.getBlogDataByName(name)
            .subscribe((success: any) => {
                if (success.result == true) {
                    this.blogDetails = success.data;
                    // console.log('this.blogDetails', this.blogDetails)
                    this.seoService.updateTitle("Blog");
                    this.seoService.updateKeywords(success.data[0].blogName);
                    this.seoService.updateDescription(success.data[0].shortDescription);
                    this.blogId = success.data[0]._id;
                    this.blogName = success.data[0].blogName;
                    this.categoryName = success.data[0].categoryId.categoryName;
                    this.blogDetails.filter((blogData) => {
                        blogData.description = this.sanitizer.bypassSecurityTrustHtml(blogData.description);
                    });
                    this.getBlogTitle(success.data[0].categoryId._id);
                    this.getCommentMessageOfBlog(this.blogId);
                } else {
                    this.global.navigateToNewPage('/errorpage');
                }
            });
    }

    getBlogTitle(categoryId) {
        this.blogDetailsProxy.getblogDetailsBasedOnCategory(categoryId)
            .subscribe((success: any) => {
                if (success.result == true) {
                    success.data.filter((data) => {
                        if (data._id != this.blogId) {
                            data.blogNameUrl = this.global.MakeStringToDashes(data.blogName);
                            this.blogTitles.push(data);
                        }
                    })
                } else {
                    this.global.navigateToNewPage('/errorpage');
                }
            });
    }

    getCommentMessageOfBlog(blogId) {
        let tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;
        this.blogDetailsProxy.getCommentMessageOfBlog(blogId)
            .subscribe((success: any) => {
                if (success.result == true) {
                    this.commentsOfThisBlog = success.data;
                    // First map the nodes of the array to an object -> create a hash table.
                    for (let i = 0, len = this.commentsOfThisBlog.length; i < len; i++) {
                        arrElem = this.commentsOfThisBlog[i];
                        mappedArr[arrElem._id] = arrElem;
                        mappedArr[arrElem._id]['children'] = [];
                    }

                    for (var _id in mappedArr) {
                        if (mappedArr.hasOwnProperty(_id)) {
                            mappedElem = mappedArr[_id];
                            // If the element is not at the root level, add it to its parent array of children.
                            if (mappedElem.parentId) {
                                // console.log('mappedElem.parentId', mappedElem)
                                mappedArr[mappedElem['parentId']]['children'].push(mappedElem);
                            }
                            // If the element is at the root level, add it to first level elements array.
                            else {
                                tree.push(mappedElem);
                            }
                        }
                    }
                    this.commentsOfThisBlog = tree;
                    // console.log('this.commentsOfThisBlog', this.commentsOfThisBlog)
                } else {
                    this.global.navigateToNewPage('/errorpage');
                }
            });
    }


    onSubmitCommentForm() {
        let messageDetails = {
            'blogId': this.blogId,
            'parentId': this.parentUserIdOfMessage,
            'messageDetails': this.blogMessageForm
        }
        this.blogDetailsProxy.storeBlogMessage(messageDetails)
            .subscribe((success: any) => {
                if (success.result == true) {
                    // console.log('success.result', success.result)
                    this.parentUserIdOfMessage = undefined;
                    this.parentUserName = '';
                    this.replayUserName = false;
                } else {
                    // console.log('success.result', success.result)
                    this.parentUserIdOfMessage = undefined;
                    this.parentUserName = '';
                    this.replayUserName = false;
                }
            });
    }

    chatReplyLink(parentId, parentUserName) {
        // console.log('parentId', parentId, 'parentUserName', parentUserName);
        this.parentUserIdOfMessage = parentId;
        this.parentUserName = parentUserName;
        this.replayUserName = true;
        this.vc.first.nativeElement.focus();
    }

    searchOption(name: string) {
        this.router.navigate(['/blog', name]);
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            map(term => term === '' ? []
                : this.blog.filter(v => v.blogName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )

    formatter = (x: { blogName: string, _id: any, blogNameUrl: string }) => {
        this.router.navigate(['/blog', x.blogNameUrl]);

    }

}
