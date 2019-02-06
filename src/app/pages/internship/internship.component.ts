import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InternshipService } from './internship.service';
import { ConditionalExpr } from '@angular/compiler';
import { Global } from '../../common/global';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  public company: any;
  public range : any;
  public resume : any;
  public internship : any;
  public categoryIdList: any;
  public checkUser: any;
  public noDataMessage: boolean = false;
  public doneButton: boolean = true;

  constructor(public internshipService: InternshipService,
    public global: Global, private modalService: NgbModal,
    public activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.forEach((items) =>  { 
      (items.hasOwnProperty('id')) ? this.categoryId = items.id:''; 
    })
  
    if (this.global.getStorageDetail('internshipRedirect')) {
      this.global.deleteLocalData('internshipRedirect')
    }
    this.listCategory(); 
    this.submitFilter();
    if(this.global.getStorageDetail('user')){
      this.checkUser = this.global.getStorageDetail('user').data._id;
    }
  }

  submitFilter(){
    let query = '/' + this.categoryId + '/' + this.jobType + '/' + this.location + '/' + this.salary;
    this.internshipService.listInternship(query)
    .subscribe((success: any) => {
      if(success.result){
        this.noDataMessage = (success.data.length == 0) ? true: false;
        this.listInternship = success.data;
      }else{
        alert('Something went wrong');
      }
    });
  }

  listCategory(){
    this.internshipService.listCategory(1)
    .subscribe((success: any) => {
      if(success.result){
        this.category = success.data;
      }else{
        alert('Something went wrong');
      }
    });
  }  

  applyInternship(content, companyId, internshipId, categoryId){
    if (this.global.getStorageDetail('user')) {
      this.openPopUp(content,companyId,internshipId,categoryId);
    }else{
      this.global.storeDataLocal('internshipRedirect', categoryId);
      this.global.navigateToNewPage('/login');
    }
  }

  upload(evt){
    let file: any = evt.target.files[0];
    let ext = file.name.split('.')[1]; 
    let size = file.size;
    const fr = new FileReader();
    fr.onload = () => { 
      console.log(size < 100000);
        if (size < 100000 && (ext == 'docx' || ext == 'docx' || ext == 'pdf' || ext == 'PDF')) {
          const formData = new FormData();
          formData.append('file', evt.target.files[0]);
          this.internshipService.uploadResume(formData)
            .subscribe((success: any) => {
              if(success.result){
                this.resume = success.filename;
                this.doneButton = false;
              }else{
                alert('Invalid Resume Format');
              }
            });
        } else {
          alert('File is too large or Invalid');
        }
    };
    fr.readAsDataURL(file);
  }

  openPopUp(content,companyId,internshipId,categoryId){
    this.modalService.open(content);
    this.company = companyId;
    this.internship = internshipId;
    this.categoryIdList = categoryId;
  }  

  submitUpload(d){
    let userId = this.global.getStorageDetail('user').data._id;
    let data = {
      companyId : this.company,
      resume : this.resume,
      internshipId : this.internship,
      categoryId: this.categoryIdList,
      userId : userId
    }
    d('Cross click');
    this.internshipService.applyInternship(data)
    .subscribe((success: any) => {
      if(success.result){
        alert('Your resume has been send');
        this.submitFilter();
      }else{
        console.log(success);
      }
    })
  }

}
