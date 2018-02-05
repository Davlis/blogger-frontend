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

  @Input()
  public publishDate;

  @Input()
  public tags;

  @Output()
  public onClose: EventEmitter<string> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal,
              public userService: UserService,) {
  }

  public ngOnInit() {

    if (!this.publishDate) {
      this.setDefaultPublishDate();
    } else {
      this.setDate(new Date(this.publishDate))
    }

    if (this.tags) {
      this.tags = this.tags.join(' ');
    }
  }

  public setDefaultPublishDate() {
    const now = new Date();
    this.setDate(now);
  }

  public setDate(date) {
    this.publishDate = this.getFormatedDate(date);
  }

  public getFormatedDate(date) {
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth()+1,
      day: date.getUTCDate(),
    };
  }

  public submit() {

    console.log(this.tags);

    this.emitClose({
      publishDate: this.publishDate,
      tags: this.tags.split(' ') || [],
    });
    this.activeModal.close('Close click')
  }

  public emitClose(value?): void {
    this.onClose.next(value);
  }
}
