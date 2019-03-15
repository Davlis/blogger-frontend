import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'link-modal-content',
  templateUrl: './link-modal.component.html',
  styleUrls: ['./link-modal.component.scss']
})
export class LinkModalComponent {

  @Input()
  public name;

  @Output()
  public onClose: EventEmitter<string> = new EventEmitter();

  public link: string = '';

  constructor(public activeModal: NgbActiveModal) {
  }

  emitClose(value?) {
    this.onClose.next(value);
  }
}
