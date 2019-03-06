import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePageRoutingModule } from './profilePage-routing.module';
import { ProfilePageComponent } from './profilePage.component';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ProfilePageRoutingModule,
        ShareButtonsModule
    ],
    declarations:[ProfilePageComponent]
})

export class ProfilePageModule{}