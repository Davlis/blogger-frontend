import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {PostService} from '../../+core/api/post.service';
import {BlogService} from '../../+core/api/blog.service';
import {ReportService} from '../../+core/api/report.service';
import {LocalStorage} from 'ngx-webstorage';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  ReportModalComponent,
} from '../';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss'],
})
export class CommentBoxComponent implements OnInit {

  @LocalStorage()
  public user: any;

  @Input()
  public blogId: string;

  @Input()
  public postId: string;

  @ViewChild('comment')
  public comment;

  public comments: any[];

  public isBlogAuthor: boolean = false;

  constructor(public postService: PostService,
              public blogService: BlogService,
              public reportService: ReportService,
              private modalService: NgbModal,) { }

  async ngOnInit() {

    try {
      const blog = await this.blogService.getBlog(this.blogId);
      this.isBlogAuthor = blog.isAuthor;

      await this.getComments();
    } catch(err) {
      console.error(err);
    }
  }

  async getComments() {
    try {
      const result = await this.postService.getComments(this.blogId, this.postId);
      this.comments = result.rows;
    } catch(err) {
      console.error(err);
    }
  }

  async addComment() {
    try {
      const result = await this.postService.addComment(this.blogId, this.postId, {data: {
        content: this.comment.nativeElement.value,
      }})

      result.user = this.user;

      this.comments.splice(0, 0, result);
      this.comment.nativeElement.value = '';

    } catch(err) {
      console.error(err);
    }
  }

  public isUserComment(comment) {
    return comment.user.id === this.user.id;
  }

  public isAdmin() {
    return this.user.role === 'admin';
  }

  async updateComment() {
  }

  public canRemoveComment(comment) {
    return this.isUserComment(comment) || this.isAdmin() || this.isBlogAuthor;
  }

  async remove(comment) {

    if (!confirm('Are you sure to remove this comment?')) {
      return;
    }

    try {
      const result = await this.postService.removeComment(this.blogId, this.postId, comment.id)

      this.comments = this.comments.filter(c => c.id !== comment.id);

    } catch(err) {
      console.error(err)
    }
  }

  public reply(comment): void {
    this.comment.nativeElement.value += '@' + this.retrieveNicknameFromComment(comment);
  }

  public retrieveNicknameFromComment(comment): string {
    return comment.user.firstName + comment.user.lastName;
  }

  public complain(comment): void {
    const modalRef = this.openModal('report');
    modalRef.componentInstance.onClose.subscribe(async event => {
      if (event) {
        const result = await this.reportService.reportPostComment(comment.id, event);
        // populate alert that complain was succesfully made
      }
    });
  }

  private openModal(type, options?) {

    if (type === 'report') {
      return this.modalService.open(ReportModalComponent, options);
    }
  }
}
