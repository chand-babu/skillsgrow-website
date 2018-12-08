import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkPurchasingComponent } from './bulkPurchasing.component';

const routes:Routes=[
    {path:'',component:BulkPurchasingComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class BulkPurchasingRoutingModule{}
