import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'snack-bar-component-example-snack',
    templateUrl: 'snack-bar.component.html',
    styles: [`
      .example-pizza-party {
        color: hotpink;
      }
    `],
  })
  export class SnackBarComponent {
    snackBarData: any;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { 
      this.snackBarData = data;
    }

  }
