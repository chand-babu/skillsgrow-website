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
import { SEOService } from './common/seo.service';
import { NgProgressModule } from 'ngx-progressbar';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { CookieService } from 'ngx-cookie-service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPListener, HTTPStatus } from './common/interceptor';
const RxJS_Services = [HTTPListener, HTTPStatus];

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
    DataService,
    SEOService,
    CookieService,
    RxJS_Services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
 }
