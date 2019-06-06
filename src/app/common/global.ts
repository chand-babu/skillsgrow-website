import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import * as StorageShim from 'node-storage-shim';


@Injectable()
export class Global {
    previousUrl: string;
    currentUrl: string;
    public dataChanged = new Subject<boolean>();
    public storage = new StorageShim();


    constructor(public router: Router, public route: ActivatedRoute, public cookie: CookieService, @Inject(PLATFORM_ID) private platformId: Object) {
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .subscribe(
                (e: any) => {
                    this.previousUrl = this.currentUrl;
                    this.currentUrl = e.url;
                });
    }

    storageTriggered(): Observable<boolean> {
        return this.dataChanged.asObservable();
    }

    public url() {
        return { currentUrl: this.currentUrl, previousUrl: this.previousUrl };
    }
    /*
     * store  data into local storage.
     */
    public storeDataLocal(key: string, data: any): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, JSON.stringify(data));
            this.dataChanged.next(true);
        }
        if (isPlatformServer(this.platformId)) {
            this.storage.setItem(key, JSON.stringify(data));
            this.dataChanged.next(true);
        }
    }

    /*
     * get local storage data details.
     */
    public getStorageDetail(key: string): any {
        if (isPlatformBrowser(this.platformId)) {
            return JSON.parse(localStorage.getItem(key));
        }
        if (isPlatformServer(this.platformId)) {
            return JSON.parse(this.storage.getItem(key));
        }
    }

    /*
     * delete local storage data.
     */
    public deleteLocalData(key: string): void {
        // localStorage.remove(key);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(key);
        }
        if (isPlatformServer(this.platformId)) {
            this.storage.removeItem(key);
        }
    }

    /* clear local storage data */
    public clearLocalStorage(): void {
        // localStorage.clearAll();
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
        if (isPlatformServer(this.platformId)) {
            this.storage.clear();
        }
    }

    /*
     * will be used to navigate to different pages. without parameter
     */
    public navigateToNewPage(path: string): void {
        this.router.navigateByUrl(path);
    }

    public sessionAuthenticationFailed(): void {
        /*this.deleteLocalData(Constants.LOGINSESSION);*/
        this.navigateToNewPage('/login');
    }

    public MakeStringToDashes(name: String): any {
        var str = name.replace(/\s+/g, '-');
        return str.toLowerCase();
    }

    public convertDashesString(name: String): any {
        var str = name.replace(/-/g, ' ');  //remove only -(dashes) from a string
        return str;
        // return (!!str) ? str.split(' ').map(function (wrd) { return wrd.charAt(0).toUpperCase() + wrd.substr(1).toLowerCase(); }).join(' ') : '';

    }

}

