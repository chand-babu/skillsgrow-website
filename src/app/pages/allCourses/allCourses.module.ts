import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarRatingModule } from './../../../../node_modules/ngx-bar-rating/rating.module';
import { AllCoursesRoutingModule } from './allCourses-routing.module';
import { AllCoursesComponent } from './allCourses.component';
import { CommonComponentModule } from 'src/app/components/commonComponent.module';

@NgModule({
    imports: [
        CommonModule,
        BarRatingModule,
        AllCoursesRoutingModule,
        CommonComponentModule
    ],
    declarations: [AllCoursesComponent]
})

export class AllCoursesModule {}
