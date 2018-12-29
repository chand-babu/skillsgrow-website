import { Component, OnInit, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { Global } from '../../common/global';
import { NavigationEnd, Router } from '@angular/router';
import { ListingCourseProxy } from '../course-listing/course-listing.proxy';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Constants } from '../../common/constants';
import { HomeProxy } from 'src/app/pages/home/home.proxy';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [ListingCourseProxy, HomeProxy],
})

export class NavigationComponent implements OnInit {
  public logoutNavigation: boolean;
  categoryListData: any;
  model: any;
  course = [];
  numberOfClicks = 0;
  public megaMenuLayout: boolean = false;
  public profileDropDown: boolean = false;
  public userData: any;
  public imagePath = Constants.IMAGEPATH;
  public elementIsClicked: boolean = false;
  public internshipSection: boolean = false;
  public courseCategoryName: any;
  public navbarOpen = false;

  constructor(public listingCourseProxy: ListingCourseProxy, public router: Router,
    public global: Global, private _eref: ElementRef, public homeProxy: HomeProxy) {
    this.global.storageTriggered().subscribe(() => {
      if (this.global.getStorageDetail('user')) {
        const user = this.global.getStorageDetail('user');
        if (user) {
          this.logoutNavigation = true;
          this.userData = user.data;
        } else {
          this.logoutNavigation = false;
        }
      }
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit() {
    this.categoryListingCourse();
    this.getCategoryName();
    const user = this.global.getStorageDetail('user');
    if (user) {
      this.logoutNavigation = true;
      this.userData = user.data;
    } else {
      this.logoutNavigation = false;
    }
  }

  getCategoryName() {
    this.homeProxy.getCategoryName()
    .subscribe((success: any) => {
      this.courseCategoryName = success.data;
    })
  }

  logout() {
    this.global.clearLocalStorage();
    this.logoutNavigation = false;
    this.global.navigateToNewPage('/login');
  }

  userDashboardPath() {
    if (this.global.getStorageDetail('user')) {
      this.global.navigateToNewPage('/userdashboard');
    }
  }

  categoryListingCourse() {
    this.listingCourseProxy.listCategories()
      .subscribe((success: any) => {
        this.categoryListData = success.data;
        if (this.categoryListData.length >= 1) {
          this.categoryListData.filter((data) => {
            if (data.course.length >= 1) {
              this.megaMenuLayout = true;
            }
          });
        }
        this.courseObj();
      });
  }

  viewDetailsCourse(id: number) {
    this.router.navigate(['/coursedetailspage', id]);
  }

  courseObj() {
    this.categoryListData.filter((data) => {
      data.course.filter((datas) => {
        this.course.push(datas);
      });
    });
  }


  searchOption(id: any) {
    this.router.navigate(['/coursedetailspage', id]);
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.course.filter(v => v.courseName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: { courseName: string }) => x.courseName;

  keyDownFunction(event, id) {
    if (event.keyCode === 13) {
      this.router.navigate(['/coursedetailspage', id]);
    }
  }

}
