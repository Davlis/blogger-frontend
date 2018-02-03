import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class BlogService {
  
  constructor(private dataService: DataService) {
  }
}
