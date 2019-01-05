import { Component, OnInit } from '@angular/core';
import { InternshipService } from './internship.service';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  providers: [InternshipService]
})
export class InternshipComponent implements OnInit {

  public listInternship = [];
  public category = [];
  public categoryId = 'null';
  public jobType = 'null';
  public location = 'null';
  public salary = 'null';
  public joinDate = 'null';
  public range : any;

  constructor(public internshipService: InternshipService) { }

  ngOnInit() {
    this.listCategory(); 
    this.submitFilter();
  }

  submitFilter(){
    let query = '/' + this.categoryId + '/' + this.jobType + '/' + this.location + '/' + this.salary;
    console.log(query);
    this.internshipService.listInternship(query)
    .subscribe((success: any) => {
      if(success.result){
        console.log(success.data);
        this.listInternship = success.data;
      }else{
        console.log(success);
        alert('Something went wrong');
      }
    });
  }

  listCategory(){
    this.internshipService.listCategory()
    .subscribe((success: any) => {
      if(success.result){
        this.category = success.data;
      }else{
        alert('Something went wrong');
      }
    });
  }  

}
