import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsPageComponent } from './courseDetailsPage.component';

const routes: Routes = [
    {path: '', component: CourseDetailsPageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CourseDetailsPageRoutingModule { }
