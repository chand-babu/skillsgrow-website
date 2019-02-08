import { NgModule } from '@angular/core';
import { NavigationComponent, BannerSliderComponent, FooterComponent, InfoBarComponent, LoginNavigationComponent,
    PageOverlayIconComponent, ProductSectionComponent, CourseListingComponent, ModalPopupComponent,
    ChatForumComponent, ConfirmPopupComponent } from './all';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { BarRatingModule } from './../../../node_modules/ngx-bar-rating/rating.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonComponentRoutingModule } from './commonComponent-routing.module';
import { MatMenuModule, MatButtonModule, MatButtonToggleModule, MatInputModule,
    MatDialogModule } from '@angular/material';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snach-bar/sanck-bar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(), NgbTypeaheadModule,
        BarRatingModule,
        CommonComponentRoutingModule,
        MatMenuModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatInputModule, MatDialogModule,
        ShareButtonsModule
    ],
    declarations: [NavigationComponent, BannerSliderComponent, FooterComponent, InfoBarComponent,
    LoginNavigationComponent, PageOverlayIconComponent, ProductSectionComponent, CourseListingComponent,
    ModalPopupComponent, SnackBarComponent,
    ChatForumComponent, ConfirmPopupComponent],
    exports: [NavigationComponent, BannerSliderComponent, FooterComponent, InfoBarComponent,
        LoginNavigationComponent, PageOverlayIconComponent, ProductSectionComponent, CourseListingComponent,
        ModalPopupComponent, ChatForumComponent, SnackBarComponent ],
        entryComponents: [
            SnackBarComponent, ConfirmPopupComponent
        ]
})

export class CommonComponentModule {}
