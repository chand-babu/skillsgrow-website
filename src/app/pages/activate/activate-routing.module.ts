import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountActivationComponent } from './activate.component';

const routes:Routes=[
    {path:'',component:AccountActivationComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class ActivateRoutingModule{}
