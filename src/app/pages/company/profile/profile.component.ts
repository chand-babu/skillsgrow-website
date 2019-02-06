import { Component, OnInit } from '@angular/core';
import { Global } from '../../../common/global';
import { Constants } from '../../../common/constants';
import { UserDetails } from '../../../interface/intership';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  public userDetails: UserDetails = <UserDetails>{};
  public successMessage: boolean = false;
  public errorMessage: boolean = false;
  public message: any;
  public img: any;
  public _URL = window.URL;
  public imagePath = Constants.IMAGEPATH;
  public userPersonalDetails: any;
  public user: any;

  public changePasswordObj = {
    _id: '',
    oldPassword: '',
    password: '',
    confirmPassword: ''
  };

  constructor(public global: Global, public profileService: ProfileService) { }

  ngOnInit() {
    if(this.global.getStorageDetail('company-user')){
      this.user = this.global.getStorageDetail('company-user').data;
      this.userDetails = this.user[0];
    }
    
    this.defaultTab();
  }

  tabsFunctionality(evt, id) {
    this.successMessage = false;
    this.errorMessage = false;
    const form: any = document.getElementsByClassName('profileTabContent');
    for (let i = 0; i < form.length; i++) {
        form[i].style.display = 'none';
    }
    const docs = document.getElementsByClassName('profileTabLink');
    for (let i = 0; i < docs.length; i++) {
        docs[i].className = docs[i].className.replace('active', '');
    }
    document.getElementById(id).style.display = 'block';
    evt.currentTarget.className += 'active';
  }

  defaultTab() {
      const userPersonalDetails = this.global.getStorageDetail('company-user');
      if (userPersonalDetails.data.loginStatus === 0) {
          document.getElementById('defaultChangePassword').click();
      } else {
          document.getElementById('defaultOpen').click();
      }
  }

  updateUserDetails(){
    delete this.userDetails.password;
    delete this.userDetails.status;
    this.profileService.updateCompany(this.userDetails)
    .subscribe((success: any) => {
      console.log(success);
      if(success.result){
        this.successMessage = true;
        this.message = "Successfully Updated";
      }else{  
        alert("Something Went Wrong");
      }
    })
  }

  changePasswordForm(form) {
    this.changePasswordObj._id = this.userDetails._id;
    if (this.changePasswordObj.password === this.changePasswordObj.confirmPassword) {
      this.profileService.updatePasswordCompany(this.changePasswordObj)
      .subscribe((success: any) => {
        console.log(success);
        if(success.result){
          this.successMessage = true;
          this.errorMessage = false;
          this.message = 'Password Changed Successfully';
          form.reset();
        }else{  
          this.successMessage = false;
          this.errorMessage = true;
          this.message = 'Old Password Is Incorrect';
        }
      })
    } else {
        this.successMessage = false;
        this.errorMessage = true;
        this.message = 'Confirm Password is Incorrect';
    }
  }


  logout() {
    this.global.clearLocalStorage();
    this.global.navigateToNewPage('/company/company-login');
  }

}
