import { Injectable, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class FileUploadService {

  public uploader: FileUploader;
  public error: boolean = false;

  onCompleteItem = (item: any,  response: any, status: any, headers: any) => {
    console.log(item, response, status, headers);    
  }

  onAfterAddingFile = (file) => {
    file.method = 'PUT'
    file.withCredentials = false;
  }

  onErrorItem = (item: any, response: any, status: any, headers: any) => {
    this.error = true;
  }

  constructor(private authService: AuthService) {
    this.initUploader();
  }

  private initUploader(): void {
    if (!this.uploader) {
      this.uploader = new FileUploader({url: environment.api_url});
      this.uploader.onAfterAddingFile = this.onAfterAddingFile;
      this.uploader.onCompleteItem = this.onCompleteItem;
      this.uploader.onErrorItem = this.onErrorItem;
    }
  }

  setOptions(endpoint?, onCompleteAll?) {
    if (endpoint) {
      this.setEndpoint(endpoint);
    }
    if (onCompleteAll) {
      this.setOnCompleteAll(onCompleteAll);
    }
  }

  setEndpoint(endpoint: string): void {
    this.uploader.setOptions({url: environment.api_url + endpoint});
  }

  setOnCompleteAll(func) {
    this.uploader.onCompleteAll = () => func(this.error);
  }

  private setAuth() {
    this.uploader.authToken = this.authService.getAuthHeader();
  }

  add(file): void {
    this.uploader.addToQueue(file);
  }

  remove(file): void {
    this.uploader.removeFromQueue(file);
  }

  getLength(): number {
    return this.uploader.queue.length;
  }

  upload(): void {
    this.setAuth();
    this.uploader.uploadAll();
  }
}
