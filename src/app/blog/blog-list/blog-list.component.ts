import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BlogService} from '../../+core/api/blog.service';
import {SearchService} from '../../+core/services/search.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  providers: [SearchService],
})
export class BlogListComponent implements OnInit {


  public blogs: any[] = []

  constructor(public router: Router,
              public blogService: BlogService,
              public searchService: SearchService,) { }

  ngOnInit() {
    this.getBlogs();
    this.searchInitialization();
  }

  async getBlogs() {
    try {
      const result = await this.blogService.getBlogs();
      this.blogs = result.map(r => r.blog);
    } catch(err) {

    }
  }


  public search(value) {
    if (value) {
      this.searchService.search(value);
    } else {
      this.getBlogs();
    }
  }

  public searchInitialization() {
    this.searchService.setEndpoint(`search/user-blogs`)
    this.searchService.subscribe(v => {
      if (v) {
        this.blogs = v.rows;
      }
    });
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }

  public gotoBlog(blog) {
    this.router.navigate(['/blog', blog.id]);
  }
}
