import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';

import {
  LinkModalComponent,
  PictureModalComponent
} from '../+shared';

declare var $;

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {

  @ViewChild('textarea')
  public textarea;

  public selectionStart: number = 0;
  public selectionEnd: number = 0;

  constructor(private modalService: NgbModal,
              public router: Router,
              public localStorage: LocalStorageService,) { }

  ngOnInit() {
  }

  public bold(): void {
    this.insert('<b></b>');
  }

  public cursive(): void {
    this.insert('<i></i>')
  }

  public strike(): void {
    this.insert('<s></s>')
  }

  public link(): void {
    const modalRef = this.openModal('link', { size: 'lg' });
    modalRef.componentInstance.onClose.subscribe(text => {
      text && this.insert(`<a href="${text}"></a>`);
    });
  }

  public quote(): void {
    this.insert('<blockquote></blockquote>')
  }

  public insertPicture(): void {
    const modalRef = this.openModal('picture', { size: 'lg' });
    modalRef.componentInstance.onClose.subscribe(event => {
      event && this.insert(`<img src="${event}" />`);
    });
  }

  public gotoViewMode(): void {

    this.localStorage.store('viewHTML', this.textarea.nativeElement.value);

    open('post-preview', '_blank');
  }

  public getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
       this.selectionStart = oField.selectionStart;
       this.selectionEnd = oField.selectionEnd;
    }
  }

  public insert(newText) {
    const el = $(this.textarea.nativeElement);

    const text = el.val()

    const before = text.substring(0, this.selectionStart)
    const after  = text.substring(this.selectionEnd, text.length)

    el.val(before + newText + after)
    el[0].selectionStart = el[0].selectionEnd = this.selectionStart + newText.length

    el.focus()
  }

  private openModal(type, options?) {

    if (type === 'link') {
      return this.modalService.open(LinkModalComponent, options);
    }

    if (type === 'picture') {
      return this.modalService.open(PictureModalComponent, options);
    }

  }

}
