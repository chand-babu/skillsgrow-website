import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseLearningPageRoutingModule } from './courseLearningPage-routing.module';
import { CourseLearningPageComponent } from './courseLearningPage.component';
import { FormsModule } from '@angular/forms';
import { CommonComponentModule } from "./../../components/commonComponent.module";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CourseLearningPageRoutingModule, CommonComponentModule
    ],
    declarations: [CourseLearningPageComponent]
})

export class CourseLearningPageModule {}
