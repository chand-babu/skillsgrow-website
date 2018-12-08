import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentCourseLandingPageRoutingModule } from './enrollmentCourseLandingPage-routing.module';
import { EnrollmentCourseLandingPageComponent } from './enrollmentCourseLandingPage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
    imports: [
        CommonModule,
        EnrollmentCourseLandingPageRoutingModule,
        NgCircleProgressModule.forRoot({}),
        NgbModule
    ],
    declarations: [EnrollmentCourseLandingPageComponent]
})

export class EnrollmentCourseLandingPageModule {}
