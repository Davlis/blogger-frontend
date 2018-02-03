import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class PostService {
  
  constructor(private dataService: DataService) {
  }
}
