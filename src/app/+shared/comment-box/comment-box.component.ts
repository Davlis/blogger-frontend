import {Component, OnInit, Input} from '@angular/core';
import {PostService} from '../../+core/api/post.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss'],
})
export class CommentBoxComponent implements OnInit {

  @Input()
  public blogId: string;

  @Input()
  public postId: string;

  public comments: any[];

  public myComment: string = '';

  constructor(public postService: PostService) { }

  public ngOnInit() {
    this.getComments();
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

      this.comments.splice(0, 0, result);

    } catch(err) {
      console.error(err);
    }
  }

  async updateComment() {
  }
}
