import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { HomeProxy } from './home.proxy';
import { Router } from '@angular/router';
import { Constants } from '../../common/constants';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HomeProxy]
})
export class HomeComponent implements OnInit {

  public imagePath: any;
  public listBannerImagesData: any;
  public whatOthersTalkSection = [];
  public mediaWidth: number;
  public mainWidth: number;
  public smallDevice: boolean = false;
  public discoverBy: string = 'allCourses';
  public carouselOne: NguCarousel;
  public bannerImageSection: boolean = false;
  public discoverBySectionImage: any[];

  // type writer
  textLength: any = 0;
  text = 'Lorem ipsum dummy text blabla';

  constructor(public global: Global, public homeproxy: HomeProxy,
    public router: Router) { }

  ngOnInit() {
    this.bannerImagesList();
    this.imagePath = Constants.IMAGEPATH;
    this.discoverSection();
    this.testimonialSection();
    this.carouselOne = {
      grid: { xs: 1, sm: 2, md: 2, lg: 4, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    };
    // this.responsiveSlider();
    // this.register();
    // this.lol();
  }

  discoverSection() {
    this.discoverBySectionImage = [
      {
        image: 'smaller1a.jpg',
        title: 'Popular Courses'
      },
      {
        image: 'smaller2a.jpg',
        title: 'Free Courses'
      },
      {
        image: 'smaller3a.jpg',
        title: 'Latest Courses'
      },
      {
        image: 'smaller4a.jpg',
        title: 'Rating Courses'
      }
    ];
  }

  testimonialSection() {
    this.whatOthersTalkSection = [
      {
        name: 'Gokul',
        comment: 'Providing great learning opportunities for students through Skillsgrow allows us to ensure' +
          ' that we are bringing the best quality learning to our University.',
        status: 0,
        photo: '',
        occupation: 'Placement Director - Bharath University'
      },
      {
        name: 'Ajith Kumar',
        comment: 'Freshers come with a diverse set of skills, but often need to develop additional' +
          ' technical competencies to find careers in' +
          'the rapidly evolving workforce. Skillsgrow offers relevant training from top educators' +
          'that our new recruits can do at their own pace,' +
          'wherever they are – empowering them with the skills they need to achieve career success',
        status: 0,
        photo: '',
        occupation: 'GENERAL MANAGER - Redington India'
      },
      {
        name: 'Deepak',
        comment: 'Skillsgrows self-paced module encouraged me to get more proactive' +
          'with my learning. I engaged with the material, took better notes,' +
          'and staggered the classes to fit in with my busy schedule at Mindtree.',
        status: 0,
        photo: '',
        occupation: 'Lead – Quality Audit Mindtree'
      },
      {
        name: 'Shilpa',
        comment: `I love the fact that, even though it's online training,` +
          `you get to know the instructors. You have the ability to search by` +
          `instructor and take several of their courses. That makes it different` +
          `than other online training offerings.`,
        status: 0,
        photo: '',
        occupation: 'Engineering Student'
      },
      {
        name: 'Balachandran',
        comment: `Through Skillsgrow, we’ve been able to be proactive and provide a` +
          `baseline of knowledge – of say, Angular, for example – so we can utilize our` +
          `engineering resources no matter the project. We believe Skillsgrow is crucial` +
          `to making sure we continue to develop our employees’ skills.`,
        status: 0,
        photo: '',
        occupation: 'Founder & CEO Powerflow Engineers'
      },
      {
        name: 'Dr. VP Ramamurthy',
        comment: `skillsgrow.com provides us with a very scalable solution.` +
          `And it's very high quality. Our Skillsgrow Campus  program reporting indicates that some users` +
          `access the service for short periods to find answers when they need them,` +
          `which is great. Others log dozens of hours, as though they are walking through a library and reading every book they go by.`,
        status: 0,
        photo: '',
        occupation: 'Chairman - Dhanalakshmi College of Engineering'
      },
      {
        name: 'Prof. Vipinendran',
        comment: `Students can watch a skillsgrow.com tutorial at home to learn the basic` +
          `functionality of software and then put it into context with their professors. It's a more efficient use of time for everyone.`,
        status: 0,
        photo: '',
        occupation: 'Anna University'
      }
    ];
  }

  bannerImagesList() {
    this.homeproxy.bannerImages()
      .subscribe((success: any) => {
        console.log(success);
        this.listBannerImagesData = success.data;
        (this.listBannerImagesData.length >= 1) ? this.bannerImageSection = true : this.bannerImageSection = false;
      });
  }

  allCourses(type) {
    if (type) {
      this.router.navigate(['allcourses', type]);
    } else {
      this.router.navigate(['allcourses', this.discoverBy]);
    }
  }

  responsiveSlider() {
    const slider = document.getElementById('slider');
    let sliderWidth = slider.offsetWidth;
    const slideList = document.getElementById('sliderwrap');
    let count = 1;
    const items = this.whatOthersTalkSection.length; // slideList.querySelectorAll('li').length;
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    window.addEventListener('resize', function () {
      sliderWidth = slider.offsetWidth;
    });

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

  register() {
    this.homeproxy.getRegister()
      .subscribe((success: any) => {
        console.log(success);
        this.global.storeDataLocal('userlist', success.data);
        const user = this.global.getStorageDetail('userlist');
        user.filter((data) => {
          data.emailId = data.emailId.toLowerCase().replace(/ /g, '');
        });
        this.global.storeDataLocal('userlist', user);
        // console.log(user);
        // this.lol(user);
      });
  }

  lol() {
    const user = this.global.getStorageDetail('userlist');
    this.homeproxy.putRegister(user)
      .subscribe((succ: any) => {
        console.log(succ);
      });
  }
}
