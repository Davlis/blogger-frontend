import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileUploadService} from '../../+core/services/file-upload.service';
import {BlogService} from '../../+core/api/blog.service';

declare var $;

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
  providers: [FileUploadService],
})
export class BlogCreateComponent implements OnInit {

  public uploader: any;

  public uploadedFlag: boolean = false;

  public progress: number = 0;

  public title: string = '';
  public subtitle: string  = '';
  public photoUrl: string = '';

  constructor(public router: Router,
              public fileUploadService: FileUploadService,
              public blogService: BlogService,) {
    
    this.fileUploadService.setEndpoint('/user/upload');
    this.uploader = this.fileUploadService.uploader;
  }

  ngOnInit() {
    this.uploader.onCompleteItem = this.onComplete.bind(this);
  }

  public goHome() {
    this.router.navigate(['/home']);
  }

  async createBlog() {
    try {
      const result = await this.blogService.createBlog({
        data: {
          title: this.title,
          subtitle: this.subtitle,
          photoUrl: this.photoUrl ? this.photoUrl : null,
        }
      });
      console.log(result);
    } catch(err) {
      console.error(err);
    }
  }

  public onComplete(...args) {

    if (args[2] === 200) {

      this.progress = 100;

      const result = JSON.parse(args[1]);

      this.finishUploading(result.userUpload.uploadUrl);

    } else {
      this.progress = 0;
      console.error('Server failure');
    }
  }

  public uploadPicture($event): void {

    this.prepareUploading();

    const input = $($event.target),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    document.getElementById('upload-file-info').innerHTML = label;

    this.fileUploadService.uploader.onProgressAll = (progress) => {
      this.calculateProgress(progress);
    };

    this.fileUploadService.upload();
  }

  public prepareUploading() {
    this.uploadedFlag = false;
    this.photoUrl = '';
    this.progress = 0;
  }

  public finishUploading(photoUrl) {
    setTimeout(() => this.uploadedFlag = true, 1000);
    this.progress = 100;
    this.photoUrl = photoUrl;
  }

  public calculateProgress(progress) {
    this.progress = progress / 2;
  }
}
