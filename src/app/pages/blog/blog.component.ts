import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';
import { SEOService } from './../../common/seo.service';
import { BlogProxy } from './blog.proxy';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { SafePipe } from '../../common/videourl.component';
import { Constants } from '../../common/constants';
import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    providers: [BlogProxy, SafePipe],
})

export class BlogComponent implements OnInit {

    public imagePath = Constants.IMAGEPATH;
    public blogDetails = [];
    public categoriesTitle = [];
    blog = [];
    model: any;
    public displayCategoryTitle: boolean = false;
    public categoryName = '';
    config: any;
    public isImgLoaded: boolean = true;
    onLoad() {
        this.isImgLoaded = false;
    }

    constructor(public videourl: SafePipe, private sanitizer: DomSanitizer, public blogProxy: BlogProxy,
        public global: Global, public activateRoute: ActivatedRoute, public router: Router,
        public seoService: SEOService) {
        this.config = {
            currentPage: 1,
            itemsPerPage: 5
        };

        this.activateRoute.queryParamMap
            .map(params => params.get('page'))
            .subscribe(page => this.config.currentPage = page);


        for (let i = 1; i <= 100; i++) {
            this.blogDetails.push(`item ${i}`);
        }

        this.activateRoute.queryParamMap
            .map(params => params.get('category'))
            .subscribe((category: any) => {
                // console.log('category', category)
                if (category == null) {
                    this.blogData();
                    this.displayCategoryTitle = false;
                }
            });


    }

    ngOnInit() {
        this.seoService.updateTitle('Blog');
        const objects = document.getElementsByClassName('asyncImage');
        Array.from(objects).map((item: any) => {
            // Start loading image
            const img = new Image();
            img.src = item.dataset.src;
            // Once image is loaded replace the src of the HTML element
            img.onload = () => {
                item.classList.remove('asyncImage');
                return item.nodeName === 'IMG' ?
                    item.src = item.dataset.src :
                    item.style.backgroundImage = `url(${item.dataset.src})`;
            };
        });
        // this.blogData();
        this.getAllCategoriesTitle();
    }

    pageChange(newPage: number) {
        this.router.navigate(['blog'], { queryParams: { page: newPage } });
        // console.log(newPage,'newPage');
    }

    blogData() {
        this.blogProxy.getblogDetails()
            .subscribe((success: any) => {
                if (success.result == true) {
                    this.blogDetails = success.data;
                    this.convertBlogName(this.blogDetails);
                    this.blogDetails.filter((blogData) => {
                        blogData.description = this.sanitizer.bypassSecurityTrustHtml(blogData.description);
                        this.blog.push(blogData);
                    });
                } else {
                    this.global.navigateToNewPage('/errorpage');
                }
            });
    }

    getAllCategoriesTitle() {
        this.blogProxy.getCategoriesTitle()
            .subscribe((success: any) => {
                if (success.result == true) {
                    this.categoriesTitle = success.data;
                } else {
                    this.global.navigateToNewPage('/errorpage');
                }
            });
    }

    convertBlogName(blogs) {
        blogs.map((blogDetails) => {
            blogDetails.blogNameUrl = this.global.MakeStringToDashes(blogDetails.blogName);
        });
        this.blogDetails = blogs;
    }

    showCategoryBlogData(categoryId, categoryName) {
        this.categoryName = categoryName;
        this.blogProxy.getblogDetailsBasedOnCategory(categoryId)
            .subscribe((success: any) => {
                if (success.result == true) {
                    this.displayCategoryTitle = true;
                    this.blogDetails = success.data;
                    this.convertBlogName(this.blogDetails);
                    this.blogDetails.filter((blogData) => {
                        blogData.description = this.sanitizer.bypassSecurityTrustHtml(blogData.description);
                    });
                    this.router.navigate(['blog'], { queryParams: { category: this.global.MakeStringToDashes(categoryName) } });
                } else {
                    this.global.navigateToNewPage('/errorpage');
                }
            });
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
