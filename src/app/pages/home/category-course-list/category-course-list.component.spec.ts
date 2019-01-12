import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCourseListComponent } from './category-course-list.component';

describe('CategoryCourseListComponent', () => {
  let component: CategoryCourseListComponent;
  let fixture: ComponentFixture<CategoryCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
