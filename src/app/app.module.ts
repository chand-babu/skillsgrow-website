import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import { HttpUtil } from './common/http.util';
import { Global } from './common/global';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SafePipe } from './common/videourl.component';
import { CommonComponentModule } from './components/commonComponent.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './common/data.service';
import { NgProgressModule } from 'ngx-progressbar';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    CommonComponentModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    NgProgressModule,
    NgxUiLoaderModule
  ],
  providers: [
    HttpUtil,
    Global,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
