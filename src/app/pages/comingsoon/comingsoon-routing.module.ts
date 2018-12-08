import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComingSoonComponent } from "./comingsoon.component";

const routes:Routes=[
    {path:'',component:ComingSoonComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class ComingSoonRoutingModule{}
