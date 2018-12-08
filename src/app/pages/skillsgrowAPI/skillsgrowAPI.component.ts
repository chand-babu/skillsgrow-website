import { Component, OnInit } from '@angular/core';
import { Global } from '../../common/global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-skillsgrowAPI',
    templateUrl: './skillsgrowAPI.component.html',
})

export class SkillsgrowAPIComponent implements OnInit {

    constructor(public global: Global,
        public activateRoute: ActivatedRoute, public router: Router) {
    }

    ngOnInit() {
        const objects = document.getElementsByClassName('asyncImage');
        Array.from(objects).map((item: any) => {
            // Start loading image
            const img = new Image();
            img.src = item.dataset.src;
            // Once image is loaded replace the src of the HTML element
            img.onload = () => {
                item.classList.remove('asyncImage');
                return item.nodeName === 'IMG' ?
                    item.src = item.dataset.src :
                    item.style.backgroundImage = `url(${item.dataset.src})`;
            }
        });
    }
}
