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

  public alertClass: boolean = false;
  public message: any;
  public loginData: CompanyLoginModel = <CompanyLoginModel>{};

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
                /* if (success.expired) {
                    this.message = success.message;
                    this.expired = true;
                } else {
                    this.expired = false;
                    this.message = 'Username and password is invalid';
                } */
            } else {
                this.global.storeDataLocal('company-user', success);
                this.global.navigateToNewPage('/company/dashboard');
                this.openSnackBar('Welcome to Skillsgrow InternShip !!!!');
            }
        });
    }
  }

  openSnackBar(message: String) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }

}
