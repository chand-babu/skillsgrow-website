import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
})
export class ModalPopupComponent implements AfterViewInit {
    @ViewChild('content') content: ElementRef;
    @Input() modalData: any;

  constructor(private modalService: NgbModal) { }

  ngAfterViewInit() {
      setTimeout(() => {
        this.openLg(this.content);
      },100);
  }

  openLg(content) {
    this.modalService.open(content);
}

}
