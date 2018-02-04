import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class BlogService {
  
  constructor(private dataService: DataService) {
  }

  public getBlogs(): Promise<any> {
    return this.dataService.callHandler('get', 'blogs');
  }

  public createBlog(data): Promise<any> {
    return this.dataService.callHandler('post', 'blogs', data);
  }

  public getBlog(id): Promise<any> {
    return this.dataService.callHandler('get', `blogs/${id}`);
  }

  public updateBlog(id, data): Promise<any> {
    return this.dataService.callHandler('put', `blogs/${id}`, data);
  }

  public deleteBlog(id): Promise<any> {
    return this.dataService.callHandler('delete', `blogs/${id}`);
  }
}
