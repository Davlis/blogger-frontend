import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BlogService} from '../../+core/api/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {


  public blogs: any[] = []

  constructor(public router: Router,
              public blogService: BlogService,) { }

  ngOnInit() {
    this.getBlogs();
  }

  async getBlogs() {
    try {
      const result = await this.blogService.getBlogs();
      this.blogs = result.map(r => r.blog);
    } catch(err) {

    }
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }

  public gotoBlog(blog) {
    this.router.navigate(['/blog', blog.id]);
  }
}
