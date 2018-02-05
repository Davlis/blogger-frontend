import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class ReportService {

  constructor(private dataService: DataService) {
  }

  public reportPostComment(id, body): Promise<any> {
    return this.dataService.callHandler('post', 'report', {
      data: {
        type: 'post_comment',
        body,
        id,
      }
    });
  }

  public reportUser(id, body): Promise<any> {
    return this.dataService.callHandler('post', 'report', {
      data: {
        type: 'user',
        body,
        id,
      }
    })
  }
}