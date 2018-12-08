import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentPageRoutingModule } from './enrollmentPage-routing.module';
import { EnrollmentPageComponent } from './enrollmentPage.component';
import { BarRatingModule } from './../../../../node_modules/ngx-bar-rating/rating.module';

@NgModule({
    imports: [
        CommonModule,
        EnrollmentPageRoutingModule,
        BarRatingModule,
    ],
    declarations: [EnrollmentPageComponent]
})

export class EnrollmentPageModule {}
