import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'picture-modal-content',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss']
})
export class PictureModalComponent {

  @Input()
  public name;

  @Output()
  public onClose: EventEmitter<string> = new EventEmitter();

  public pictureUrl: string = '';

  constructor(public activeModal: NgbActiveModal) {
  }

  public uploadPicture(): void {
    // TODO
  }

  public emitClose(value): void {
    this.onClose.next(value);
  }
}
