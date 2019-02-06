import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { InternshipDataModel } from '../../../interface/intership';
import { CompanyService } from './company.service';
import { InternshipService } from '../../internship/internship.service';
import { NgbDateFRParserFormatter } from './dateFormate';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  providers: [CompanyService, InternshipService,
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class CompanyFormComponent implements OnInit {

  public personal: boolean = false;
  public company: boolean = false;
  public internship: boolean = false;
  public emailExistStatus: boolean = false;
  public formData: InternshipDataModel = <InternshipDataModel>{};
  public imageName: any;
  public categorySet = [];

  public size: any;
  public width: number;
  public height: number;

  constructor(public comapnyService: CompanyService, 
    public internshipService: InternshipService) { }

  ngOnInit() {
    this.personal = true;
    this.formData.qualification = '0';
    this.formData.internType = '0';
    this.formData.category = '0';
    this.formData.location = '0';
    this.listCategory();
  }

  onSubmit(formValues){
    if(formValues.invalid){

    }else {
      if(this.personal){
        this.personal = false;
        this.company = true;
        this.internship = false;
      }else if(this.company){
        this.personal = false;
        this.company = false;
        this.internship = true;
      }else if(this.internship){
        this.formData.companyLogo = this.imageName;
        this.formData.contact = '+91' + this.formData.contact;
        this.comapnyService.postInternship(this.formData)
        .subscribe((success: any) => {
          formValues.resetForm();
          if(success.result){
            alert('Successfully Added');
          }else{
            alert('Something Went Wrong');
          }
          console.log(success); 
        });
      }
    }
  }

  goBack(){
    if(this.company){
      this.personal = true;
      this.company = false;
      this.internship = false;
    }else if(this.internship){
      this.personal = false;
      this.company = true;
      this.internship = false;
    }
  }

  imageUpload(evt){
    const image: any = evt.target.files[0];
    this.size = image.size;
    const fr = new FileReader();
    fr.onload = () => { 
      const img: any = new Image();
      img.onload = () => {
        this.width = img.width;
          this.height = img.height;
        if (this.width === 300 && this.height === 250) {
          const formData = new FormData();
          formData.append('image', evt.target.files[0]);
          this.comapnyService.uploadImage(formData)
            .subscribe((success: any) => {
              this.imageName = success.filename;
            });
        } else {
          alert('image ratio should be 300*250');
        }
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(image);
  }

  listCategory(){
    this.internshipService.listCategory(1)
    .subscribe((success: any) => {
      if(success.result){
        this.categorySet = success.data;
      }else{
        alert('Something went wrong');
      }
    });
  }  

  fileClick(){
    let file = document.querySelector('#company_logo') as HTMLElement;
    file.click();
  }

  emailExistOrNot(){
    this.comapnyService.emailExist(this.formData.email)
    .subscribe((success: any) => {
      if(success.result){
        this.emailExistStatus = success.status;
      }else{
        alert('Something Went Wrong');
      }
    })
  }
}
