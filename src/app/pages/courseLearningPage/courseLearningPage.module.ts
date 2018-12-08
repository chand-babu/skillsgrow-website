import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseLearningPageRoutingModule } from './courseLearningPage-routing.module';
import { CourseLearningPageComponent } from './courseLearningPage.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CourseLearningPageRoutingModule,
    ],
    declarations: [CourseLearningPageComponent]
})

export class CourseLearningPageModule {}
