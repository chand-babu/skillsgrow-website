import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseTestPageRoutingModule } from './courseTestPage-routing.module';
import { CourseTestPageComponent } from './courseTestPage.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[
        CommonModule,
        CourseTestPageRoutingModule,
        FormsModule
    ],
    declarations:[CourseTestPageComponent]
})

export class CourseTestPageModule{}