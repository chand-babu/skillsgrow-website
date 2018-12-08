import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { UserDashboardRoutingModule } from './userDashboard-routing.module';
import { UserDashboardComponent } from './userDashboard.component';

@NgModule({
    imports: [
        CommonModule,
        NgCircleProgressModule.forRoot({}),
        UserDashboardRoutingModule,
    ],
    declarations: [UserDashboardComponent]
})

export class UserDashboardModule {}
