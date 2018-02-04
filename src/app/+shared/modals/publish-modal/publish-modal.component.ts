import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FileUploadService} from '../../../+core/services/file-upload.service';
import {UserService} from '../../../+core/api/user.service';

declare var $;

@Component({
  selector: 'publish-modal-content',
  templateUrl: './publish-modal.component.html',
  styleUrls: ['./publish-modal.component.scss'],
})
export class PublishModalComponent implements OnInit {

  public publishDate: any;
  public tags: string[] = [];

  @Output()
  public onClose: EventEmitter<string> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal,
              public userService: UserService,) {
  }

  public ngOnInit() {
  }

  public emitClose(value): void {
    this.onClose.next(value);
  }
}
