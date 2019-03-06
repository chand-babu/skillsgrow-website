import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CategoryCourseListComponent } from './category-course-list/category-course-list.component';

const routes:Routes=[
    {path:'',component:HomeComponent},
    // {path:'categorycourse/:categoryId',component:CategoryCourseListComponent},
    { path: 'categorycourse/:categoryName', component: CategoryCourseListComponent }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class HomeRoutingModule{}
