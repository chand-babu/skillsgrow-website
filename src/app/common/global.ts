import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class Global {
    previousUrl: string;
    currentUrl: string;
    public dataChanged = new Subject<boolean>();

    constructor(public router: Router, public route: ActivatedRoute) {
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
        // console.log("===",key)
        localStorage.setItem(key, JSON.stringify(data));
        this.dataChanged.next(true);
    }

    /*
     * get local storage data details.
     */
    public getStorageDetail(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    /*
     * delete local storage data.
     */
    public deleteLocalData(key: string): void {
        // localStorage.remove(key);
        localStorage.removeItem(key);
    }

    /* clear local storage data */
    public clearLocalStorage(): void {
        // localStorage.clearAll();
        localStorage.clear();
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

