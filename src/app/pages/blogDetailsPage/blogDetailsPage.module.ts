import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailsPageRoutingModule } from './blogDetailsPage-routing.module';
import { BlogDetailsPageComponent } from './blogDetailsPage.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        BlogDetailsPageRoutingModule,
        ShareButtonsModule,
        FormsModule,
        NgbModule.forRoot(),
        NgbTypeaheadModule
    ],
    declarations: [BlogDetailsPageComponent]
})

export class BlogDetailsPageModule { }