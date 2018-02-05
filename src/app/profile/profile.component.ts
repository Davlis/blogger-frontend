import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from '../+core/api/user.service';
import { AdminService } from '../+core/api/admin.service';
import { ReportService } from '../+core/api/report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  ReportModalComponent,
} from '../+shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  public user: any;
  public userBlogs: any[];


  constructor(public router: Router,
              public route: ActivatedRoute,
              public userService: UserService,
              public adminService: AdminService,
              public localStorageService: LocalStorageService,
              private modalService: NgbModal,
              public reportService: ReportService,) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      try {
        this.user = await this.userService.getUser(params['id']);
        this.getUserBlogs();
      } catch(err) {
        console.error(err);
        this.router.navigate(['/home']);
      }
    })
  }

  public isMe() {
    return this.localStorageService.retrieve('user').id === this.user.id
  }

  async blockUser() {

    if (!confirm('Are you sure to block this user?')) {
      return;
    }

    try {
      const result = await this.adminService.blockUser(this.user.id);
      this.user = result;
    } catch(err) {
      console.error(err);
    }
  }

  async unblock() {

    if (!confirm('Are you sure to unblock this user?')) {
      return;
    }

    try {
      const result = await this.adminService.unblockUser(this.user.id);
      this.user = result;
    } catch(err) {
      console.error(err);
    }
  }

  report() {
    const modalRef = this.openModal('report');
    modalRef.componentInstance.onClose.subscribe(async event => {
      if (event) {
        const result = await this.reportService.reportUser(this.user.id, event);
        // populate alert that complain was succesfully made
      }
    });
  }

  async getUserBlogs() {
    const result = await this.userService.getUserBlogs(this.user.id);
    this.userBlogs= result;
  }

  private openModal(type, options?) {

    if (type === 'report') {
      return this.modalService.open(ReportModalComponent, options);
    }
  }

  public isAdmin() {
    return this.localStorageService.retrieve('user').role === 'admin';
  }

}
