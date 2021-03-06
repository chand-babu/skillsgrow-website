import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';
import { CommonComponentModule } from '../../components/commonComponent.module';
import { FormsModule } from '@angular/forms';
import { CategoryCourseListComponent } from './category-course-list/category-course-list.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgbModule.forRoot(),
        CommonComponentModule,
        FormsModule,
        SlickCarouselModule
    ],
    declarations: [HomeComponent, CategoryCourseListComponent]
})

export class HomeModule {}
