import { NgModule } from '@angular/core';
import { NavigationComponent, BannerSliderComponent, FooterComponent, InfoBarComponent, LoginNavigationComponent,
    PageOverlayIconComponent, ProductSectionComponent, CourseListingComponent, ModalPopupComponent,
    ChatForumComponent } from './all';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BarRatingModule } from './../../../node_modules/ngx-bar-rating/rating.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonComponentRoutingModule } from './commonComponent-routing.module';
import { MatMenuModule } from '@angular/material';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(), NgbTypeaheadModule,
        BarRatingModule,
        CommonComponentRoutingModule,
        MatMenuModule,
        ShareButtonsModule.forRoot()
    ],
    declarations: [NavigationComponent, BannerSliderComponent, FooterComponent, InfoBarComponent,
    LoginNavigationComponent, PageOverlayIconComponent, ProductSectionComponent, CourseListingComponent,
    ModalPopupComponent,
    ChatForumComponent],
    exports: [NavigationComponent, BannerSliderComponent, FooterComponent, InfoBarComponent,
        LoginNavigationComponent, PageOverlayIconComponent, ProductSectionComponent, CourseListingComponent,
        ModalPopupComponent, ChatForumComponent]
})

export class CommonComponentModule {}
