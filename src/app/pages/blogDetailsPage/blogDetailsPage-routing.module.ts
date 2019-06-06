import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsPageComponent } from './blogDetailsPage.component';

const routes: Routes = [
    { path: '', component: BlogDetailsPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BlogDetailsPageRoutingModule { }
