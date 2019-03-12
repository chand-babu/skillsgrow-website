import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Global } from '../../common/global';
import { Router } from '@angular/router';
import { ListingCourseProxy } from '../course-listing/course-listing.proxy';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Constants } from '../../common/constants';
import { HomeProxy } from './../../pages/home/home.proxy';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../snach-bar/sanck-bar.component';

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
  public courseCategoryName: Array<any> = [];
  public navbarOpen = false;

  constructor(public listingCourseProxy: ListingCourseProxy, public router: Router,
    public global: Global, private _eref: ElementRef, public homeProxy: HomeProxy,
    public snackBar: MatSnackBar) {
    this.global.storageTriggered().subscribe(() => {
      const user = this.global.getStorageDetail('user') ? this.global.getStorageDetail('user') : '';
      const companyUser = this.global.getStorageDetail('company-user') ?
       this.global.getStorageDetail('company-user') : '';
      if (user || companyUser) {
        this.logoutNavigation = true;
        this.userData = user.data;
      } else {
        this.logoutNavigation = false;
      }
    });
  }

  @HostListener('window:scroll') onscroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      document.getElementById('navbar').classList.add('fixed-navbar');
    } else {
      document.getElementById('navbar').classList.remove('fixed-navbar');
    }

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit() {
    this.getCategoryName();
    const user = this.global.getStorageDetail('user');
    if (user) {
      this.logoutNavigation = true;
      this.userData = user.data;
    } else {
      this.logoutNavigation = false;
    }
  }

  openSnackBar(message: String) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }

  getCategoryName() {
    this.homeProxy.getCategoryName(0)
    .subscribe((success: any) => {
      // this.courseCategoryName = success.data;
      success.data.map((cataegoryDetails) => {
        cataegoryDetails.course.map((courseDetails) => {
          courseDetails.courseNameUrl = this.global.MakeStringToDashes(courseDetails.courseName);
        });
      });
      this.courseCategoryName = success.data;
      //modified by nandita(84-87)
      this.courseObj();
    });
  }

  logout() {
    if (this.global.getStorageDetail('user')) {
      this.global.clearLocalStorage();
      this.global.navigateToNewPage('/login');
    } else if (this.global.getStorageDetail('company-user')) {
      this.global.clearLocalStorage();
      this.global.navigateToNewPage('/company/company-login');
    }
    this.logoutNavigation = false;
    this.openSnackBar('successfully logged out !!');
  }

  userDashboardPath() {
    if (this.global.getStorageDetail('user')) {
      this.global.navigateToNewPage('/userdashboard');
    }
  }

  // viewDetailsCourse(id: number) {
  //   this.router.navigate(['/coursedetailspage', id]);
  // }

  viewDetailsCourse(name: string) {
    this.router.navigate(['/coursedetailspage', name]);
  }

  courseObj() {
    if (this.courseCategoryName && this.courseCategoryName.length > 0) {
      this.courseCategoryName.filter((data: any) => {
        if (data && data.course) {
          data.course.filter((course: any) => {
            this.course.push(course);
          });
        }
      });
    }
  }


  // searchOption(id: any) {
  //   this.router.navigate(['/coursedetailspage', id]);
  // }

  searchOption(name: string) {
    this.router.navigate(['/coursedetailspage', name]);
  }//modified by nandita

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.course.filter(v => v.courseName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: { courseName: string, _id: any, courseNameUrl:string}) => {
    // this.router.navigate(['/coursedetailspage', x._id]); 
    this.router.navigate(['/coursedetailspage', x.courseNameUrl]); //modified by nandita

  }

}
