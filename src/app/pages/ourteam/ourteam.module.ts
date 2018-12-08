import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurTeamComponent } from './ourteam.component';
import { OurTeamRoutingModule } from './ourteam-routing.module';

@NgModule({
    imports:[
        CommonModule,
        OurTeamRoutingModule
    ],
    declarations:[OurTeamComponent]
})

export class OurTeamModule{}