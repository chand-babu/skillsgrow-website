import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-course-list',
  templateUrl: './category-course-list.component.html',
  styleUrls: ['./category-course-list.component.css']
})

export class CategoryCourseListComponent implements OnInit {
  public categoryId: any;

  constructor(public activateRoute: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
        this.activateRoute.params.forEach(params => {
            this.categoryId = params.categoryId;
        });
  }

}
