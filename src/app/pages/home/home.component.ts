import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {VideoState} from '../../ngrx/states/video.state';
import {Observable, Subscription} from 'rxjs';
import {VideoModel} from '../../models/video.model';
import * as VideoActions from '../../ngrx/actions/video.actions';
import {AuthState} from '../../ngrx/states/auth.state';
import {filter, take} from 'rxjs/operators';
import {HorizontalCardComponent} from '../../components/horizontal-card/horizontal-card.component';
import {NgxSkeletonLoaderComponent} from 'ngx-skeleton-loader';
import {clearVideoState} from '../../ngrx/actions/video.actions';


@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink, HorizontalCardComponent, NgxSkeletonLoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  latestVideos: Observable<VideoModel[]>;
  recommendedVideos: Observable<VideoModel[]>;
  isGettingLatestVideos$: Observable<boolean>;
  isGettingRecommendedVideos$: Observable<boolean>;
  subscriptions: Subscription[] = [];
  isGettingLatest = false
  canGetMoreLatest = true
  page = 0

  constructor(private store: Store<{
    auth: AuthState,
    video: VideoState
  }>) {
    this.latestVideos = this.store.select(state => state.video.latestVideos);
    this.recommendedVideos = this.store.select(state => state.video.recommendedVideos);
    this.isGettingLatestVideos$ = this.store.select(state => state.video.isGettingLatest);
    this.isGettingRecommendedVideos$ = this.store.select(state => state.video.isGettingRecommended);
    this.store.dispatch(VideoActions.getLatestVideos({page: 0,}));
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.auth.auth).pipe(
        filter(auth => !!auth && !!auth.access_token),
        take(1)
      ).subscribe(
        auth => {
          this.store.dispatch(VideoActions.getRecommendedVideos());
        }
      ),
      this.latestVideos.subscribe(video => {
        console.log(video)
      }),
      this.recommendedVideos.subscribe(video => {
        console.log(video)
      }),
      this.isGettingLatestVideos$.subscribe(isGetting => {
        this.isGettingLatest = isGetting
      }),
      this.store.select(state => state.video.canGetMoreLatest).subscribe(canGetMore => {
        this.canGetMoreLatest = canGetMore
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(VideoActions.clearVideoState());
  }


  onScroll(event: any) {
    const target = event.target;
    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 100;

    console.log(
      bottomReached,
      !this.isGettingLatest,
    );

    if (
      bottomReached &&
      !this.isGettingLatest &&
      this.canGetMoreLatest
    ) {
      this.loadMore();
    }
  }

  private loadMore() {
    console.log('Loading more videos...');
    console.log(this.isGettingLatest, this.canGetMoreLatest);
    if (!this.isGettingLatest && this.canGetMoreLatest) {
      this.page += 1;
      this.store.dispatch(VideoActions.getLatestVideos({page: this.page}))
    }
  }
}
