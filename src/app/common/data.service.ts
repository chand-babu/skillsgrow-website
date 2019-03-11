import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject(false);
  currentCourseData = this.messageSource.asObservable();

  constructor() { }

  containCourseData(data: any) {
    this.messageSource.next(data);
  }

}
