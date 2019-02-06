import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyComponent } from './company.component';
import { CompanyLoginComponent } from './login/company-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ActivateComponent } from './activate/activate.component';

const routes:Routes=[
    { 
        path:'', component: CompanyComponent,
        children: [
            { path:'', redirectTo: 'company-login', pathMatch: 'full', },
            { path:'company-register', component: CompanyFormComponent },
            { path:'company-login', component: CompanyLoginComponent },
            { path:'dashboard', component: DashboardComponent },
            { path:'profile', component: ProfileComponent },
            { path:'activate/:id', component: ActivateComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CompanyFormRoutingModule { }
