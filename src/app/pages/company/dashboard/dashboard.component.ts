import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { InternshipFormModel } from '../../../interface/intership';
import { DashboardService } from './dashboard.service'; 
import { InternshipService } from '../../internship/internship.service'; 
import { Global } from '../../../common/global';
import { NgbDateFRParserFormatter } from '../company-form/dateFormate';
import { ConfirmPopupComponent } from '../../../components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DashboardService,InternshipService,
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class DashboardComponent implements OnInit {
  
  public dataSource = [];
  public appliedCandidate = [];
  public categorySet = [];
  public fileUrl: any;
  public sessionData: any;
  public formData: InternshipFormModel = <InternshipFormModel>{};
  public formDataEdit: InternshipFormModel = <InternshipFormModel>{};
  public showPostTable: boolean = false;
  public showAppliedPostTable: boolean = false;
  public postForm: boolean = false
  public postEditForm: boolean = false;

  constructor(public dashboardService: DashboardService, 
    public internshipService: InternshipService,
    public global: Global, private sanitizer: DomSanitizer,
    public dialog: MatDialog) { }

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
    this.internshipService.listCategory(1)
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
        console.log(success.data);
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
    this.postEditForm = false;
    this.listPostedInternship();
  }

  newPost(){
    this.showPostTable = false;
    this.showAppliedPostTable = false;
    this.postEditForm = false;
    this.postForm = true;
  }

  showAppliedPost(){
    this.showPostTable = false;
    this.showAppliedPostTable = true;
    this.postForm = false;
    this.postEditForm = false;
    this.listAppliedUsersInternship();
  }

  onSubmit(form){
    this.formData.companyId = this.sessionData._id;
    this.dashboardService.internshipPost(this.formData)
    .subscribe((success: any) => {
      if(success.result){
         form.resetForm();
        alert('Successfully Added');
      }else{
        alert('Something Went Wrong');
      }
    })
  }

  openConfirmation(id): void {
    let dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '350px',
      data: { 
        dataSet: { id : id }, 
        title: 'Delete Confirmation', 
        message: 'Are you sure ?',
        hideSubmit: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.dataSet.id);
      this.dashboardService.deletePost(result.dataSet.id)
      .subscribe((success: any) => {
        console.log(success);
        if(success.result){
          this.dialog.open(ConfirmPopupComponent, {
            width: '350px',
            data: {  
              title: 'Success', 
              message: 'Successfully deleted',
              hideSubmit: true
            }
          });
        }else{
          this.dialog.open(ConfirmPopupComponent, {
            width: '350px',
            data: {  
              title: 'Error', 
              message: 'SomeThing Went Wrong',
              hideSubmit: true
            }
          });
        }
        this.listPostedInternship();
      })
      
    });
  }

  edit(id){
    this.showPostTable = false;
    this.showAppliedPostTable = false;
    this.postForm = false;
    this.postEditForm = true;
    this.dashboardService.getInternship(id)
    .subscribe((success: any) => {
      if(success.result){
        this.formDataEdit = success.data;
        this.formDataEdit.categoryId = success.data.category;
        let date = new Date(success.data.dateOfJoining);
        let formatDate = { day: date.getDate(), month : date.getMonth() + 1, year : date.getFullYear() };
        this.formDataEdit.dateOfJoining = formatDate;
      }else{
        alert('Something Went Wrong');
      }
    });
  }

  onUpdate(form){
    delete this.formDataEdit.createdOn;
    this.dashboardService.updateInternship(this.formDataEdit)
    .subscribe((success: any) => {
      if(success.result){
        alert('Successfully Updated');
      }else{
        alert('Something Went Wrong');
      }
    })
  }

}
