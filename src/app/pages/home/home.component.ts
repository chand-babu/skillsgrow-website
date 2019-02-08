import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { HomeProxy } from './home.proxy';
import { Router } from '@angular/router';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeProxy],
})
export class HomeComponent implements OnInit {

  public imagePath: any;
  public listBannerImagesData: any;
  public bannerImageSection: boolean = false;
  public courseCategoryName: any;
  public courseCategoryType: any;
  public slideConfig = {
     slidesToShow: 6,
     slidesToScroll: 1,
     autoplay: true,
     autoplaySpeed: 2000,
     dots: true,
     responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 719,
        settings: {
          slidesToShow: 2
        }
      }]
    };

  constructor(public global: Global, public homeproxy: HomeProxy,
    public router: Router) { }

  ngOnInit() {
    this.bannerImagesList();
    this.imagePath = Constants.IMAGEPATH;
    this.getCategoryName(0);
    this.getCategoryType(1);
  }

  getCategoryType(value) {
    this.homeproxy.getCategoryName(value)
    .subscribe((success: any) => {
      this.courseCategoryType = success.data;
    });
  }

  getCategoryName(value) {
    this.homeproxy.getCategoryName(value)
    .subscribe((success: any) => {
      this.courseCategoryName = success.data;
    });
  }

  bannerImagesList() {
    this.homeproxy.bannerImages()
      .subscribe((success: any) => {
        this.listBannerImagesData = success.data;
        (this.listBannerImagesData.length >= 1) ? this.bannerImageSection = true : this.bannerImageSection = false;
      });
  }

  internship(id) {
    this.global.navigateToNewPage('internship/' + id);
  }

}
