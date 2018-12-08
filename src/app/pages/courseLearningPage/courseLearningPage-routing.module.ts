import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLearningPageComponent } from './courseLearningPage.component';

const routes: Routes = [
    {path: '', component: CourseLearningPageComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CourseLearningPageRoutingModule {}
