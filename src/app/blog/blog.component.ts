import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BlogService} from '../+core/api/blog.service';
import {PostService} from '../+core/api/post.service';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public user: any = {
    firstName: 'Dawid',
    lastName: 'Liszka',
  };

  public blog: any;
  public backgroundImg: any;

  public blogPosts: any[] = [];

  constructor(public router: Router,
              public route: ActivatedRoute,
              public blogService: BlogService,
              public postService: PostService,
              private sanitizer: DomSanitizer,) { }

  ngOnInit() {

    this.route.params.subscribe(async params => {
      await this.getBlog(params['id'])
      await this.getBlogPosts(params['id'])
    });
  }

  public gotoPost(post) {
    this.router.navigate(['/post-view', this.blog.id, post.id]);
  }

  async getBlog(id) {
    try {
      this.blog = await this.blogService.getBlog(id);
      const photoUrl = this.blog.photoUrl ? this.blog.photoUrl : 'assets/img/blog_1.jpg';
      this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(`url(${photoUrl})`);
    } catch(err) {
      console.error(err);
    }
  }

  async getBlogPosts(id) {
    try {
      this.blogPosts = await this.postService.getPosts(id);
    } catch(err) {
      console.error(err);
    }
  }

  public editPost(post) {
    this.router.navigate(['post-edit', this.blog.id, post.id])
  }

  async deletePost(post) {

    if (!confirm('Are you sure to remove this post?')) {
      return;
    }

    try {
      await this.postService.deletePost(this.blog.id, post.id);
      this.blogPosts = this.blogPosts.filter(p => p.id !== post.id);
    } catch(err) {
      console.error(err);
    }
  }

  public subscribe(): void {

  }

  public addPost() {
    this.router.navigate(['post-edit', this.blog.id, 'new']);
  }
}
