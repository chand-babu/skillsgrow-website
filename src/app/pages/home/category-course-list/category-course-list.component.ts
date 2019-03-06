import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/common/global';

@Component({
  selector: 'app-category-course-list',
  templateUrl: './category-course-list.component.html',
  styleUrls: ['./category-course-list.component.css']
})

export class CategoryCourseListComponent implements OnInit {
  public categoryId: any;

  constructor(public global:Global,public activateRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
        this.activateRoute.params.forEach(params => {
            // this.categoryId = params.categoryId;
          this.categoryId = this.global.convertDashesString(params.categoryName); //modified by nandita
        });
  }

}
