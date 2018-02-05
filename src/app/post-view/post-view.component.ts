import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BlogService} from '../+core/api/blog.service';
import {PostService} from '../+core/api/post.service';

declare var $;

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  public post: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public blogService: BlogService,
    public postService: PostService,
  ) { }

  public ngOnInit() {
    this.route.params.subscribe(async params => {
      try {
        await this.getPost(params['blogId'], params['postId']);
      } catch(err) {
        console.error(err);
        this.router.navigate(['/home']);
      }
    });
  }

  async getPost(blogId, postId) {
    this.post = await this.postService.getPost(blogId, postId)
  }

}
