import {Component, OnInit, Input} from '@angular/core';
import {PostService} from '../../+core/api/post.service';
import {BlogService} from '../../+core/api/blog.service';
import {LocalStorage} from 'ngx-webstorage';

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

  public comments: any[];

  public myComment: string = '';

  public isBlogAuthor: boolean = false;

  constructor(public postService: PostService,
              public blogService: BlogService,) { }

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
        content: this.myComment,
      }})

      result.user = this.user;

      this.comments.splice(0, 0, result);

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
    this.isUserComment(comment) || this.isAdmin || this.isBlogAuthor;
  }

  async remove(comment) {
    try {
      const result = await this.postService.removeComment(this.blogId, this.postId, comment.id)

      this.comments = this.comments.filter(c => c.id !== comment.id);

    } catch(err) {
      console.error(err)
    }
  }
}
