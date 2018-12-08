import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactEnterpriseTeamComponent } from './contactEnterpriseTeam.component';

const routes:Routes=[
    {path:'',component:ContactEnterpriseTeamComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class ContactEnterpriseTeamRoutingModule{}
