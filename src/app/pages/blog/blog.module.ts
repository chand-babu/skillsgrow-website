import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BlogRoutingModule,
        ShareButtonsModule,
        NgxPaginationModule,
        NgbModule.forRoot(),
        NgbTypeaheadModule
    ],
    declarations: [BlogComponent]
})

export class BlogModule { }
