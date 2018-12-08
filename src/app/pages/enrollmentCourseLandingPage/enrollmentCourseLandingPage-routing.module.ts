import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentCourseLandingPageComponent } from './enrollmentCourseLandingPage.component';

const routes: Routes = [
    {path: '', component: EnrollmentCourseLandingPageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EnrollmentCourseLandingPageRoutingModule {}
