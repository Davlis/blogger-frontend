import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'report-modal-content',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent {

  @Output()
  public onClose: EventEmitter<string> = new EventEmitter();

  public content: string = '';

  constructor(public activeModal: NgbActiveModal) {
  }

  emitClose(value?) {
    this.onClose.next(value);
  }
}
