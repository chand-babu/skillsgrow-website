import { Component, OnInit } from '@angular/core';
import { CompanyLoginModel } from '../../../interface/intership' 
import { CompanyLoginService } from './company-login.service';
import { Global } from '../../../common/global';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from 'src/app/components/snach-bar/sanck-bar.component';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  providers: [CompanyLoginService]
})
export class CompanyLoginComponent implements OnInit {

  public loginForm: Boolean = true;
  public forgotPasswordForm: Boolean = false;
  public alertClass: boolean = false;
  public message: any;
  public forgotPwd: any;
  public emailLink: any;
  public responseStatus: any;
  public loginData: CompanyLoginModel = <CompanyLoginModel>{};

  public sendActiveLink: boolean = false;
  public forgotErrorMessage: boolean = false;
  public forgotSuccessMessage: boolean = false;
  public aftersendActiveLink: boolean = false;

  constructor(public companyLoginService: CompanyLoginService, public global: Global,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.global.getStorageDetail('company-user')){
      this.global.navigateToNewPage('/company/dashboard');
    }
    if(this.global.getStorageDetail('user')){
      this.alertClass = true;
      this.message = 'Student Account already logged in please logout';
    }
  }

  loginFieldsData(form) {
    console.log(this.loginData);
    if(this.global.getStorageDetail('user')){
      this.alertClass = true;
      this.message = 'Student Account already logged in please logout';
    }else{
      this.companyLoginService.companyLogin(this.loginData)
        .subscribe((success : any) => {
          console.log(success);
            if (!success.result) {
                this.alertClass = true;
                this.message = 'Username and password is invalid';
            } else {
              if(success.data[0].active){
                this.global.storeDataLocal('company-user', success);
                this.global.navigateToNewPage('/company/dashboard');
                this.openSnackBar('Welcome to Skillsgrow InternShip !!!!');
              }else{
                this.aftersendActiveLink = false;
                this.sendActiveLink = true;
                this.emailLink = {
                  id : success.data[0]._id
                }
              }
            }
        });
    }
  }

  resendActivationLink(){
    this.companyLoginService.resendLink(this.emailLink)
    .subscribe((success: any) => {
      if(success.result){
        this.aftersendActiveLink = true;
        this.sendActiveLink = false;
        this.responseStatus = 'success';
        this.message = 'Link successfully send to your Email ID';
      }else{
        this.aftersendActiveLink = true;
        this.sendActiveLink = false;
        this.responseStatus = 'danger';
        this.message = 'Something Went Wrong';
      }
    })
    
  }

  openSnackBar(message: String) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }

  forgotPassword(){
    this.loginForm = false;
    this.forgotPasswordForm = true;
  }

  loginPage(){
    this.loginForm = true;
    this.forgotPasswordForm = false;
  }

  submitForgotPwd(form){
    if(form.invalid){
    }else{
      let data = { email : this.forgotPwd };
      this.companyLoginService.forgotPwd(data)
      .subscribe((success: any) => {
        console.log(success);
        if(success.result){
          this.forgotErrorMessage = false;
          this.forgotSuccessMessage = true;
          this.message = "Successfully send please check your Email";
        }else{
          this.forgotErrorMessage = true;
          this.forgotSuccessMessage = false;
          this.message = "Email Id not exist";
        }
      })
    }
  }

}
