import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class SEOService {
    constructor(private title: Title, private meta: Meta) { }


    updateTitle(title: string) {
        this.title.setTitle(title);
        this.meta.updateTag({ name: 'title', content: title })
    }

    updateDescription(desc: string) {
        this.meta.updateTag({ name: 'description', content: desc })
    }
    updateKeywords(key: string) {
        this.meta.updateTag({ name: 'keywords', content: key })
    }

    // setRobots() {
    //     this.meta.updateTag({ name: 'robots', content: 'index' })
    // }

    removeRobots() {
        this.meta.updateTag({ name: 'robots', content: 'noindex' })
    }

}