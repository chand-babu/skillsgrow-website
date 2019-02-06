import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../../../common/global';
import { ActivateService } from './activate.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  providers: [ActivateService]
})
export class ActivateComponent implements OnInit {

  public id: any;
  public successMessage: boolean = false;
  public errorMessage: boolean = false;
  public message: any;
  constructor(public activateRoute: ActivatedRoute, 
    public activateService: ActivateService, public global: Global) { }

  ngOnInit() {
    this.activateRoute.params.forEach(params => {
      this.id = params['id'];  
    });
    this.checkTokenValid();
  }

  checkTokenValid(){
    this.activateService.checkTokenValidService({ id: this.id })
    .subscribe((success: any) => {
      console.log(success);
      if(success.result){
        this.successMessage = true;
        this.updateActiveStatus(this.id);
        setTimeout(() => {
          this.global.navigateToNewPage('/company/company-login');
        }, 2000);
      }else{
        this.errorMessage = true;
        setTimeout(() => {
          this.global.navigateToNewPage('/');
        }, 2000);
      }
    })
  }

  updateActiveStatus(id){
    this.activateService.updateActiveStatus({ id: this.id })
    .subscribe((success: any) => {
      console.log(success);
    })
  }

}
