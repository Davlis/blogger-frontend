import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class PostService {
  
  constructor(private dataService: DataService) {
  }

  public getPosts(blogId): Promise<any> {
    return this.dataService.callHandler('get', `blogs/${blogId}/posts`);
  }

  public createPost(blogId, data): Promise<any> {
    return this.dataService.callHandler('post', `blogs/${blogId}/posts`, data);
  }

  public getPost(blogId, postId): Promise<any> {
    return this.dataService.callHandler('get', `blogs/${blogId}/posts/${postId}`);
  }

  public updatePost(blogId, postId, data): Promise<any> {
    return this.dataService.callHandler('put', `blogs/${blogId}/posts/${postId}`, data);
  }

  public deletePost(blogId, postId): Promise<any> {
    return this.dataService.callHandler('delete', `blogs/${blogId}/posts/${postId}`);
  }

  public getComments(blogId, postId): Promise<any> {
    return this.dataService.callHandler('get', `blogs/${blogId}/posts/${postId}/comment`);
  }

  public addComment(blogId, postId, data): Promise<any> {
    return this.dataService.callHandler('post', `blogs/${blogId}/posts/${postId}/comment`, data);
  }

  public removeComment(blogId, postId, commentId): Promise<any> {
    return this.dataService.callHandler('delete', `blogs/${blogId}/posts/${postId}/comment/${commentId}`);
  }

  public updateComment(blogId, postId, commentId, data): Promise<any> {
    return this.dataService.callHandler('put', `blogs/${blogId}/posts/${postId}/comment/${commentId}`, data);
  }
}
