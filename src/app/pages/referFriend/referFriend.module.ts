import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferFriendRoutingModule } from './referFriend-routing.module';
import { ReferFriendComponent } from './referFriend.component';
import { ShareButtonsModule } from '@ngx-share/buttons';

@NgModule({
    imports: [
        CommonModule,
        ReferFriendRoutingModule,
        ShareButtonsModule
    ],
    declarations: [ReferFriendComponent]
})

export class ReferFriendModule {}
