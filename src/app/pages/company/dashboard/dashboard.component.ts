import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InternshipFormModel } from '../../../interface/intership';
import { DashboardService } from './dashboard.service'; 
import { InternshipService } from '../../internship/internship.service'; 
import { Global } from '../../../common/global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DashboardService,InternshipService]
})
export class DashboardComponent implements OnInit {
  
  public dataSource = [];
  public appliedCandidate = [];
  public categorySet = [];
  public fileUrl: any;
  public sessionData: any;
  public formData: InternshipFormModel = <InternshipFormModel>{};
  public showPostTable: boolean = false;
  public showAppliedPostTable: boolean = false;
  public postForm: boolean = false

  constructor(public dashboardService: DashboardService, 
    public internshipService: InternshipService,
    public global: Global, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(!this.global.getStorageDetail('company-user')){
      this.global.navigateToNewPage('/company/company-login');
    }else{
      this.formData.qualification = '0';
      this.formData.internType = '0';
      this.formData.categoryId = '0';
      this.formData.location = '0';
      this.formData.salary = '0';
      this.sessionData = this.global.getStorageDetail('company-user').data[0];
      this.listPostedInternship();
      this.listAppliedUsersInternship();
      this.listCategory();
      this.postForm = true;
    }
  }

  listCategory(){
    this.internshipService.listCategory()
    .subscribe((success: any) => {
      if(success.result){
        this.categorySet = success.data;
      }else{
        alert('Something Went Wrong');
      }
    })
  }

  listPostedInternship(){
    let session = this.sessionData._id;
    this.dashboardService.listInternshipPost(session)
    .subscribe((success : any) => {
      if(success.result){
        this.dataSource = success.data;
      }else{
        alert('something went wrong');
      }
    });
  }

  listAppliedUsersInternship(){
    let session = this.sessionData._id;
    this.dashboardService.listAppliedInternshipPost(session)
    .subscribe((success : any) => {
      if(success.result){
        this.appliedCandidate = success.data;
        // const data = 'http://localhost/upload_resume/'+success.data[0].resume;
        // const blob = new Blob([data], { type: 'application/octet-stream' });

        // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      }else{
        alert('something went wrong');
      }
    });
  }

  showPost(){
    this.showPostTable = true;
    this.showAppliedPostTable = false;
    this.postForm = false;
    this.listPostedInternship();
  }

  newPost(){
    this.showPostTable = false;
    this.showAppliedPostTable = false;
    this.postForm = true;
  }

  showAppliedPost(){
    this.showPostTable = false;
    this.showAppliedPostTable = true;
    this.postForm = false;
    this.listAppliedUsersInternship();
  }

  onSubmit(form){
    this.formData.companyId = this.sessionData._id;
    console.log(this.formData);
    this.dashboardService.internshipPost(this.formData)
    .subscribe((success: any) => {
      console.log(success);
      if(success.result){
         form.resetForm();
        alert('Successfully Added');
      }else{
        alert('Something Went Wrong');
      }
    })
  }



}
