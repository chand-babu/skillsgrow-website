import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseRoutingModule } from './response-routing.module';
import { ResponseComponent } from './response.component';

@NgModule({
    imports: [
        CommonModule,
        ResponseRoutingModule
    ],
    declarations: [ResponseComponent]
})

export class ResponseModule {}
