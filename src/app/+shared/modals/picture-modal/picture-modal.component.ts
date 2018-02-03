import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FileUploadService} from '../../../+core/services/file-upload.service';
import {UserService} from '../../../+core/api/user.service';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';

export const url = process.env.API_URL + '/user/upload';

declare var $;

@Component({
  selector: 'picture-modal-content',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss'],
  providers: [FileUploadService],
})
export class PictureModalComponent implements OnInit {

  public uploader: any;

  @Output()
  public onClose: EventEmitter<string> = new EventEmitter();

  public pictureUrl: string = '';

  public progress: number = 0;

  public activeTab: number = 1;

  public userPictures: any[] = [];

  public selectedPicture: any;

  constructor(public activeModal: NgbActiveModal,
              public fileUploadService: FileUploadService,
              public userService: UserService,) {

    this.fileUploadService.setEndpoint('/user/upload');
    this.uploader = this.fileUploadService.uploader;
  }

  public ngOnInit() {
    this.uploader.onCompleteItem = this.onComplete.bind(this);
    this.getUserPictures();
  }

  public onComplete(...args) {

    if (args[2] === 200) {

      this.progress = 100;

      const result = JSON.parse(args[1]);

      setTimeout(() => { 
        this.emitClose(result.userUpload.uploadUrl);
        this.activeModal.close('Close click');
      }, 1000);

    } else {
      this.progress = 0;
      console.error('Server failure');
    }
  }

  public beforeChange($event: NgbTabChangeEvent) {

    this.activeTab = + $event.nextId.replace('tab-', '');

    if ($event.nextId === 'tab-2' || $event.nextId === 'tab-3') {
      this.fileUploadService.removeAll();
      this.progress = 0;
    }
  };

  public uploadPicture($event): void {

    const input = $($event.target),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    document.getElementById('upload-file-info').innerHTML = label;

    this.fileUploadService.uploader.onProgressAll = (progress) => {
      this.calculateProgress(progress);
    };

    this.fileUploadService.upload();
  }

  public selectPicture(index) {
    this.selectedPicture = index;
    this.pictureUrl = this.userPictures[index].uploadUrl;
  }

  async getUserPictures() {
    this.userPictures = await this.userService.getUserFiles();
  }

  public emitClose(value): void {
    this.onClose.next(value);
  }

  public calculateProgress(progress) {
    this.progress = progress / 2;
  }
}
