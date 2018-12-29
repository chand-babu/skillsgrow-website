import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Global } from '../../common/global';
import { HomeProxy } from './home.proxy';
import { Router } from '@angular/router';
import { Constants } from '../../common/constants';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeProxy],
})
export class HomeComponent implements OnInit {

  public imagePath: any;
  public listBannerImagesData: any;
  public carouselOne: NguCarousel;
  public bannerImageSection: boolean = false;
  public courseCategoryName: any;

  constructor(public global: Global, public homeproxy: HomeProxy,
    public router: Router) { }

  ngOnInit() {
    this.bannerImagesList();
    this.imagePath = Constants.IMAGEPATH;
    this.carouselOne = {
      grid: { xs: 1, sm: 2, md: 2, lg: 6, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    };
    this.getCategoryName();
  }

  getCategoryName() {
    this.homeproxy.getCategoryName()
    .subscribe((success: any) => {
      this.courseCategoryName = success.data;
    })
  }

  bannerImagesList() {
    this.homeproxy.bannerImages()
      .subscribe((success: any) => {
        this.listBannerImagesData = success.data;
        (this.listBannerImagesData.length >= 1) ? this.bannerImageSection = true : this.bannerImageSection = false;
      });
  }

}
