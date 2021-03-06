import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FileUploadService} from '../../+core/services/file-upload.service';
import {BlogService} from '../../+core/api/blog.service';
import {
  FormGroup, 
  FormBuilder, 
  FormArray, 
  FormControl, 
  Validators
} from '@angular/forms';

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

  public formGroup: FormGroup;

  public photoUrl: string;

  public editMode: boolean = false;
  public fetchedBlog: any;

  constructor(public router: Router,
              public route: ActivatedRoute,
              public fileUploadService: FileUploadService,
              public blogService: BlogService,
              public fb: FormBuilder,) {
    
    this.fileUploadService.setEndpoint('/user/upload');
    this.uploader = this.fileUploadService.uploader;
  }

  ngOnInit() {
    this.uploader.onCompleteItem = this.onComplete.bind(this);
    this.formInit();

    this.route.params.subscribe(async params => {
      if (params['id'] !== 'new') {

       this.fetchedBlog = await this.getBlog(params['id'])

       this.editMode = true;

       this.formGroup.get('title').setValue(this.fetchedBlog.title);
       this.formGroup.get('subtitle').setValue(this.fetchedBlog.subtitle);
       this.formGroup.get('photoUrl').setValue(this.fetchedBlog.photoUrl);
       this.photoUrl = this.fetchedBlog.photoUrl;

       if (this.photoUrl) {
         this.uploadedFlag = true;
         document.getElementById('upload-file-info').innerHTML = this.photoUrl;
       }

      }
    });
  }

  async getBlog(id) {
    try {
      return await this.blogService.getBlog(id);
    } catch(err) {
      console.error(err);
    }
  }

  public formInit() {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      photoUrl: [null]
    });
  }

  public goHome() {
    this.router.navigate(['/home']);
  }

  async updateBlog() {
    try {
      const result = await this.blogService.updateBlog(this.fetchedBlog.id, {
        data: this.formGroup.value,
      });

      this.router.navigate(['/blog', result.id]);

    } catch(err) {
      console.error(err);
    }
  }

  async createBlog() {
    try {
      const result = await this.blogService.createBlog({
        data: this.formGroup.value,
      });

      this.router.navigate(['/blog', result.id]);

    } catch(err) {
      console.error(err);
    }
  }

  public onComplete(...args) {

    if (args[2] === 200) {

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
    this.photoUrl = null;
    this.formGroup.get('photoUrl').setValue(this.photoUrl);
    this.progress = 0;
  }

  public finishUploading(photoUrl) {
    setTimeout(() => this.uploadedFlag = true, 1000);
    this.progress = 100;
    this.photoUrl = photoUrl;
    this.formGroup.get('photoUrl').setValue(this.photoUrl);
  }

  public calculateProgress(progress) {
    this.progress = progress / 2;
  }
}
