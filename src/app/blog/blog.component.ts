import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BlogService} from '../+core/api/blog.service';
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

  constructor(public router: Router,
              public route: ActivatedRoute,
              public blogService: BlogService,
              private sanitizer: DomSanitizer,) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.getBlog(params['id'])
    });
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
}
