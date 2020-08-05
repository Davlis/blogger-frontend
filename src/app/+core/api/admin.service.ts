import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class AdminService {
  constructor(private dataService: DataService) {
  }

  public blockUser(id): Promise<any> {
    return this.dataService.callHandler('post', `admin/users/block/${id}`, {data: {}})
  }

  public unblockUser(id): Promise<any> {
    return this.dataService.callHandler('post', `admin/users/unblock/${id}`, {data: {}})
  }
}
