import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';
import { CommonComponentModule } from '../../components/commonComponent.module';
import { FormsModule } from '@angular/forms';
import { NguCarouselModule } from '@ngu/carousel';
import { CategoryCourseListComponent } from './category-course-list/category-course-list.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgbModule.forRoot(),
        CommonComponentModule,
        FormsModule,
        NguCarouselModule
    ],
    declarations: [HomeComponent, CategoryCourseListComponent]
})

export class HomeModule {}
