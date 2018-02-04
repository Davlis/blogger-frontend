import { Injectable } from '@angular/core';
import { DataService } from '../api/data.service';
import { Subscription } from 'rxjs';
import { Observable }   from 'rxjs/Observable';
import { Subject }      from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class SearchService {

  public endpoint: string = '';
  public searchQueryParam: string = 'query';
  public additionalFilterQuery: any = {};

  public items;
  public subscription: Subscription;
  public searchTerms = new Subject<any>();

  private debounceTime = 300;

  constructor(private dataService: DataService) {
    this.items = this.searchTerms
                  .debounceTime(this.debounceTime)
                  .distinctUntilChanged((a, b) => { 
                    return a[this.searchQueryParam] === b[this.searchQueryParam]
                  })
                  .switchMap(struct =>
                    struct[this.searchQueryParam] ? this.searchService(struct) : Observable.of<any>(null)
                  )
                  .catch(err => {
                    console.log(err);
                    return Observable.of<any[]>([]);
                  });
  }

  setSearchQueryParam(name): void {
    this.searchQueryParam = name;
  }

  setEndpoint(endpoint) {
    this.endpoint = endpoint;
  }

  setFilterQuery(query) {
    if (this.endpoint) {
      this.additionalFilterQuery = query;
    }
  }

  subscribe(callback) {
    this.subscription = this.items.subscribe(v => {
      callback(v);
    });
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private searchService(queryStruct) {
    if (!this.endpoint) {
      console.log('You need to provide endpoint');
      return Observable.of<any>(null);
    } else {
      
      Object.assign(queryStruct, this.additionalFilterQuery);

      return this.dataService.getObservableDataQuery(this.endpoint, queryStruct);
    }
  }

  search(term: string, query: any = {}): void {
    term = term.trim();
    this.searchTerms.next(Object.assign({ [this.searchQueryParam]: term }, query));
  }

  // TODO: cancel debounce time
  forceSearch(term: string, query: any = {}): void {
    this.resetTerm();
    term = term.trim();
    setTimeout(() => {
      this.searchTerms.next(Object.assign({ [this.searchQueryParam]: term }, query));
    }, this.debounceTime);
  }

  resetTerm(): void {
    this.searchTerms.next({ [this.searchQueryParam]: '' });
  }

}
