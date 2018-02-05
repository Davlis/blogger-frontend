import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { PostService } from '../+core/api/post.service';
import { BlogService } from '../+core/api/blog.service';
import { DatePipe } from '@angular/common';

import {
  LinkModalComponent,
  PictureModalComponent,
  PublishModalComponent,
} from '../+shared';

declare var $;

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {

  @ViewChild('textarea')
  public textarea;

  public title: string = '';

  public selectionStart: number = 0;
  public selectionEnd: number = 0;

  public blogId: any;
  public isEdit: boolean = false;
  public post: any;

  constructor(private modalService: NgbModal,
              public router: Router,
              public route: ActivatedRoute,
              public postService: PostService,
              public blogService: BlogService,
              public localStorage: LocalStorageService,) { }

  ngOnInit() {
     this.route.params.subscribe(async params => {
       try {

         this.blogId = params['blogId'];

         if (params['postId'] !== 'new') {

           const result = await this.getPost(this.blogId, params['postId']);

           this.post = result;
           this.isEdit = true;
           this.populate(result);

         } else {
           const result = await this.getBlog(this.blogId);
         }

       } catch(err) {
         console.error(err);
         this.router.navigate(['/home']);
       }
    });
  }

  public populate(post) {
    this.title = post.title
    this.textarea.nativeElement.value = post.content;
  }

  async getBlog(id) {
    return await this.blogService.getBlog(id);
  }

  async getPost(blogId, postId) {
    return await this.postService.getPost(blogId, postId);
  }

  public bold(): void {
    this.insert('<b></b>');
  }

  public cursive(): void {
    this.insert('<i></i>')
  }

  public strike(): void {
    this.insert('<s></s>')
  }

  public link(): void {
    const modalRef = this.openModal('link', { size: 'lg' });
    modalRef.componentInstance.onClose.subscribe(text => {
      text && this.insert(`<a href="${text}"></a>`);
    });
  }

  public quote(): void {
    this.insert('<blockquote></blockquote>')
  }

  public insertPicture(): void {
    const modalRef = this.openModal('picture', { size: 'lg' });
    modalRef.componentInstance.onClose.subscribe(event => {
      event && this.insert(`<img src="${event}" />`);
    });
  }

  async publish(publishDate?, tags?) {

    const modalRef = this.openModal('publish', { size: 'lg' });

    if (publishDate) {
      modalRef.componentInstance.publishDate = publishDate;
    }

    if (tags) {
      modalRef.componentInstance.tags = tags;
    }

    modalRef.componentInstance.onClose.subscribe(async event => {

      if (event) {

        const data = {
          title: this.title,
          content: this.textarea.nativeElement.value,
          tags: event.tags,
          publishDate: this.getDate(event.publishDate),
        }

        if (this.isEdit) {
          await this.postService.updatePost(this.blogId, this.post.id, { data });
        } else {
          this.post = await this.postService.createPost(this.blogId, { data });
        }

        this.router.navigate(['post-view', this.blogId, this.post.id]);
      }
    });
  }

  public getDate(date) {

    const year = date.year;

    let month = date.month;

    if (month <= 9) {
      month = '0' + month;
    }

    let day = date.day;

    if (day <= 9) {
      day = '0'+day;
    }

    return `${year}-${month}-${day}`;
  }

  public update(): void {
    this.publish(this.post.publishDate, this.post.tags);
  }

  public gotoViewMode(): void {

    this.localStorage.store('viewHTML', this.textarea.nativeElement.value);
    this.localStorage.store('viewHTMLTitle', this.title);

    open('post-preview', '_blank');
  }

  public getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
       this.selectionStart = oField.selectionStart;
       this.selectionEnd = oField.selectionEnd;
    }
  }

  public insert(newText) {
    const el = $(this.textarea.nativeElement);

    const text = el.val()

    const before = text.substring(0, this.selectionStart)
    const after  = text.substring(this.selectionEnd, text.length)

    el.val(before + newText + after)
    el[0].selectionStart = el[0].selectionEnd = this.selectionStart + newText.length

    el.focus()
  }

  public isMinimalContent() {
    return this.title && this.textarea.nativeElement.value;
  }

  private openModal(type, options?) {

    if (type === 'link') {
      return this.modalService.open(LinkModalComponent, options);
    }

    if (type === 'picture') {
      return this.modalService.open(PictureModalComponent, options);
    }

    if (type === 'publish') {
      return this.modalService.open(PublishModalComponent, options);
    }

  }

}
