import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClient} from '@angular/common/http';
import {catchError, merge, Observable, startWith, switchMap, of as observableOf, map} from 'rxjs';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/states/auth.state';
import {VideoModel} from '../../models/video.model';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-analytics',
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, MatIconModule, DecimalPipe],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements AfterViewInit {
  private _httpClient = inject(HttpClient);

  displayedColumns: string[] = [
    'title',
    'description',
    'categoryId',
    'thumbnailPath',
    'duration',
    'viewCount',
    'status',
    'createdAt',
    'isPublic',
  ];
  exampleDatabase!: ExampleHttpDatabase | null;
  data: VideoModel[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<{ auth: AuthState }>) {
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient, this.store);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalCount;
          return data.videos;
        }),
      )
      .subscribe(data => (this.data = data));
  }
}

export interface GithubApi {
  videos: VideoModel[];
  totalCount: number;
}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  accessToken!: string

  constructor(private _httpClient: HttpClient, private store: Store<{
    auth: AuthState
  }>) {
    this.store.select((state: any) => state.auth).subscribe((authState) => {
      this.accessToken = authState.auth.access_token || '';
    });
  }

  getRepoIssues(sort: string, order: SortDirection, page: number): Observable<GithubApi> {
    const href = `${environment.api_base_url}/video/user-videos/7bd0330f-b0e1-4ee7-aba0-fff2860e749d`;
    console.log(sort, order, page)
    const requestUrl = `${href}?sort=${sort}&orderBy=${order}&page=${page}&limit=10`;

    return this._httpClient.get<GithubApi>(requestUrl, {
      headers: {
        'Authorization': this.accessToken
      }
    });
  }

}
