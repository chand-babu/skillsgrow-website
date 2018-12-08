import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePageRoutingModule } from './profilePage-routing.module';
import { ProfilePageComponent } from './profilePage.component';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ProfilePageRoutingModule
    ],
    declarations:[ProfilePageComponent]
})

export class ProfilePageModule{}