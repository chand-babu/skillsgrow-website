import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, RouterEvent, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { Global } from './common/global';
import { Spinkit } from 'ng-http-loader';
import { Meta, Title } from '@angular/platform-browser';
import { NgProgress } from 'ngx-progressbar';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { HTTPStatus } from './common/interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit, AfterViewInit {
  public developerMode: boolean;
  public spinkit = Spinkit;
  public sampleCount: any[];
  public seconds = 0;
  public timer: any;
  public items: any[];
  public HTTPActivity: boolean;//added by nandita


  constructor(private httpStatus: HTTPStatus, public ngProgress: NgProgress, private router: Router, public global: Global,
    private meta: Meta, private title: Title, @Inject(PLATFORM_ID) private platformId: Object) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.HTTPActivity = status;
      if (this.HTTPActivity == true) {
        this.ngProgress.start()
      }
      if (this.HTTPActivity == false) {
        this.ngProgress.done();
      }
    });
  }

  ngAfterViewInit() {
    // this.router.events.subscribe((routeEvent: RouterEvent) => {
    //   if (routeEvent instanceof NavigationStart) {
    //     // this.loader = true;
    //     this.ngProgress.start();
    //   }
    //   if (routeEvent instanceof NavigationEnd ||
    //     routeEvent instanceof NavigationCancel || routeEvent instanceof NavigationError) {
    //     // this.loader = false;
    //     this.ngProgress.done();
    //   }
    // });
  }

  ngOnInit() {
    this.items = ['1', '2', '3', '4', '5'];
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
      if (this.router.url.split('?')[1] === 'dev=true') {
        this.developerMode = true;
        this.global.storeDataLocal('develop', this.developerMode);
      } else if (this.router.url.split('?')[1] === 'dev=false') {
        this.developerMode = false;
        this.global.deleteLocalData('develop');
      }


      // if (this.router.url.split('?')[0] === '/courselearningpage') {
      if (this.router.url.split('/')[1] === 'courselearningpage') {
        // console.log("++++++courselearningpage++++++")
        this.startTimer();
      } else {
        // console.log("++++++this.seconds++++++", this.seconds)
        this.global.storeDataLocal('timeTaken', this.seconds);
        clearInterval(this.timer);
        this.seconds = 0;
      }

    });
    // this.responsiveSlider();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  responsiveSlider() {
    const slider = document.getElementById('slider');
    let sliderWidth = slider.offsetWidth;
    const slideList = document.getElementById('sliderwrap');
    let count = 1;
    const items = this.items.length; // slideList.querySelectorAll('li').length;
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', function () {
        sliderWidth = slider.offsetWidth;
      });
    }

    const prevSlide = function () {
      if (count > 1) {
        count = count - 2;
        slideList.style.left = '-' + count * sliderWidth + 'px';
        count++;
      } else if (count = 1) {
        count = items - 1;
        slideList.style.left = '-' + count * sliderWidth + 'px';
        count++;
      }
    };

    const nextSlide = function () {
      if (count < items) {
        slideList.style.left = '-' + count * sliderWidth + 'px';
        count++;
      } else if (count = 1) {
        slideList.style.left = '0px';
        count = 1;
      }
    };

    next.addEventListener('click', function () {
      nextSlide();
    });

    prev.addEventListener('click', function () {
      prevSlide();
    });

    setInterval(function () {
      nextSlide();
    }, 8000);
  }

}
