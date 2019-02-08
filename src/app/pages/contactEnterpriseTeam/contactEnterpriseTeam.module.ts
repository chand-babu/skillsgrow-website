import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactEnterpriseTeamComponent } from './contactEnterpriseTeam.component';
import { ContactEnterpriseTeamRoutingModule } from './contactEnterpriseTeam-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonComponentModule } from './../../components/commonComponent.module';

@NgModule({
    imports: [
        CommonModule,
        ContactEnterpriseTeamRoutingModule,
        FormsModule,
        CommonComponentModule
    ],
    declarations: [ContactEnterpriseTeamComponent]
})

export class ContactEnterpriseTeamModule { }

