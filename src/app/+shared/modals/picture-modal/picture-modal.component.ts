import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FileUploadService} from '../../../+core/services/file-upload.service';


export const url = process.env.API_URL + '/user/upload';

@Component({
  selector: 'picture-modal-content',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss'],
  providers: [FileUploadService],
})
export class PictureModalComponent {

  public uploader: any;

  @Output()
  public onClose: EventEmitter<string> = new EventEmitter();

  public pictureUrl: string = '';

  constructor(public activeModal: NgbActiveModal,
              public fileUploadService: FileUploadService,) {
    this.fileUploadService.setEndpoint('/user/upload');
    this.uploader = this.fileUploadService.uploader;
  }

  public uploadPicture(): void {
    this.fileUploadService.upload();
  }

  public emitClose(value): void {
    this.onClose.next(value);
  }
}
