import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkPurchasingRoutingModule } from './bulkPurchasing-routing.module';
import { BulkPurchasingComponent } from './bulkPurchasing.component';

@NgModule({
    imports:[
        CommonModule,
        BulkPurchasingRoutingModule
    ],
    declarations:[BulkPurchasingComponent]
})

export class BulkPurchasingModule{}