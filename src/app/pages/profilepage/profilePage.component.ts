import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Global } from '../../common/global';
import { ProfilePageProxy } from './profilePage.proxy';
import { Constants } from '../../common/constants';


@Component({
    selector: 'app-profile-page',
    templateUrl: './profilePage.component.html',
    providers: [ProfilePageProxy]
})

export class ProfilePageComponent implements OnInit {
    public userDetails = {
        profilePic: '',
        userName: '',
        emailId: '',
        phone: '',
        gender: '',
        address: ''
    };
    public changePasswordObj = {
        _id: '',
        oldPassword: '',
        password: '',
        confirmPassword: '',
        loginStatus: 1
    };
    public successMessage: boolean = false;
    public errorMessage: boolean = false;
    public message: any;
    public img: any;
    public _URL = window.URL;
    public imagePath = Constants.IMAGEPATH;
    public userPersonalDetails: any;

    constructor(public global: Global, public profilePageProxy: ProfilePageProxy) {
    }

    ngOnInit() {
        if(this.global.getStorageDetail('company-user')){
            this.global.navigateToNewPage('/company/profile');
        }
        this.userPersonalDetails = this.global.getStorageDetail('user');
        this.checkUserDetails();
    }

    checkUserDetails() {
        this.defaultTab();
        const updatedDetails = this.global.getStorageDetail('updatedUserDetails');
        if (updatedDetails) {
            this.userDetails = updatedDetails;
        } else {
            if (this.userPersonalDetails) {
                this.userDetails = this.userPersonalDetails.data;
                this.changePasswordObj._id = this.userPersonalDetails.data._id;
            }
        }
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
        const userPersonalDetails = this.global.getStorageDetail('user');
        if (userPersonalDetails.data.loginStatus === 0) {
            document.getElementById('defaultChangePassword').click();
        } else {
            document.getElementById('defaultOpen').click();
        }
    }

    uploadPic(file) {
        this.img = new Image();
        this.img.src = this._URL.createObjectURL(file.target.files[0]);
        this.img.onload = (e) => {
            const formData = new FormData();
            formData.append('image', file.target.files[0]);
            this.profilePageProxy.userPic(formData)
                .subscribe((success: any) => {
                    this.userDetails.profilePic = success.filename;
                });
        };
    }

    updateUserDetails() {
        this.profilePageProxy.userDetailsData(this.userDetails)
            .subscribe((success: any) => {
                console.log(success);
                if (success.result) {
                    this.successMessage = true;
                    this.errorMessage = false;
                    this.message = 'Updated Successfully';
                    const user = this.global.getStorageDetail('user');
                    user.data = this.userDetails;
                    this.global.storeDataLocal('user', user);
                }
            });
    }

    logout() {
        this.global.clearLocalStorage();
        this.global.navigateToNewPage('/login');
    }

    changePasswordForm(form) {
        if (this.changePasswordObj.password === this.changePasswordObj.confirmPassword) {
            this.profilePageProxy.changePassword(this.changePasswordObj).
                subscribe((success: any) => {
                    if (success.result) {
                        this.successMessage = true;
                        this.errorMessage = false;
                        this.message = 'Password Changed Successfully';
                        form.reset();
                        this.userPersonalDetails.data.loginStatus = this.changePasswordObj.loginStatus;
                        this.global.storeDataLocal('user', this.userPersonalDetails);
                    } else {
                        this.successMessage = false;
                        this.errorMessage = true;
                        this.message = 'Old Password Is Incorrect';
                    }
                });
        } else {
            this.successMessage = false;
            this.errorMessage = true;
            this.message = 'Confirm Password is Incorrect';
        }
    }

}
