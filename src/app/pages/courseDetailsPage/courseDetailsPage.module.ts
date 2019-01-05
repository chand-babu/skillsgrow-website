import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseDetailsPageRoutingModule } from './courseDetailsPage-routing.module';
import { CourseDetailsPageComponent } from './courseDetailsPage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BarRatingModule } from './../../../../node_modules/ngx-bar-rating/rating.module';
import { CommonComponentModule } from "./../../components/commonComponent.module";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatExpansionModule,
        MatSidenavModule,
        CourseDetailsPageRoutingModule,
        NgbModule.forRoot(),
        BarRatingModule, CommonComponentModule
    ],
    declarations: [CourseDetailsPageComponent]
})

export class CourseDetailsPageModule {}
