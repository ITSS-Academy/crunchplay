import {Component, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';
import {PlayerComponent} from '../../components/player/player.component';
import {Store} from '@ngrx/store';
import {VideoState} from '../../ngrx/states/video.state';
import {VideoModel} from '../../models/video.model';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe, DatePipe, NgClass, NgStyle, SlicePipe} from '@angular/common';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import * as VideoActions from '../../ngrx/actions/video.actions';
import {ActivatedRoute} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {DurationPipe} from '../../pipes/duration.pipe';

@Component({
  selector: 'app-video-detail',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    PlayerComponent,
    AsyncPipe,
    FormsModule,
    DatePipe,
    SlicePipe,
    NgClass,
    NgStyle,
    DurationPipe
  ],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss'
})
export class VideoDetailComponent implements OnInit, OnDestroy {
  videoDetail$: Observable<VideoModel>;
  isGettingVideoById$: Observable<boolean>;
  subscriptions: Subscription[] = [];
  @ViewChild('recommendedVideosContainer') recommendedVideosContainer?: ElementRef<HTMLDivElement>;
  private recommendedScrollTop = 0;
  isGettingLikeCommentCount$: Observable<boolean>

  isGettingNextVideos$: Observable<boolean>

  constructor(
    private store: Store<{
      video: VideoState
    }>,
    private activatedRoute: ActivatedRoute,
  ) {
    const videoId = this.activatedRoute.snapshot.paramMap.get('videoId');
    this.videoDetail$ = this.store.select(state => state.video.videoDetail);
    this.isGettingLikeCommentCount$ = this.store.select(state => state.video.isGettingLikeComments);
    this.isGettingNextVideos$ = this.store.select(state => state.video.isGettingLatest);
    this.isGettingVideoById$ = this.store.select(state => state.video.isGetVideoById);
    this.store.dispatch(VideoActions.getVideoById({videoId: videoId as string}));
    this.store.dispatch(VideoActions.getNextVideos({videoId: videoId as string, page: 0}));
    this.store.dispatch(VideoActions.getLikeCommentCount({videoId: videoId as string}));

  }

  ngOnInit() {
    this.subscriptions.push(
      this.videoDetail$.subscribe(video => {
        console.log(video)
      }),
      this.store.select(state => state.video.latestVideos).subscribe(videos => {
        if (videos) {
          this.recommendedVideos = videos;
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(VideoActions.clearVideoState());
  }

  video = {
    id: '2425ff90-9a0c-4651-bde5-8b1329cbe49a',
    title: 'Optimus nói sẽ trở lại',
    description: 'Optimus có máu nghề trở lại',
    createdAt: '2025-08-30T13:13:00.404225',
    viewCount: 42,
    thumbnailPath: 'https://zkeqdgfyxlmcrmfehjde.supabase.co/storage/v1/object/public/videos/2425ff90-9a0c-4651-bde5-8b1329cbe49a/thumbnail.jpg',
    videoPath: 'https://zkeqdgfyxlmcrmfehjde.supabase.co/storage/v1/object/public/videos/2425ff90-9a0c-4651-bde5-8b1329cbe49a/master.m3u8',
    profile: {
      username: '39-Nguyễn Đặng Gia Tường',
      avatar: null
    }
  };

  recommendedVideos!: VideoModel[]

  comments = [
    {
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      username: 'Nguyễn Văn A',
      text: 'Video rất hay và bổ ích!'
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      username: 'Trần Thị B',
      text: 'Cảm ơn bạn đã chia sẻ!'
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      username: 'Lê Văn C',
      text: 'Mong chờ video tiếp theo!'
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
      username: 'Phạm Thị D',
      text: 'Nội dung rất hữu ích!'
    }
  ];

  newComment = '';
  showComments = false;
  showDescriptionDetail = false;

  subscribe() {
    console.log('Subscribed to', this.video.profile.username);
  }

  likeVideo() {
    console.log('Liked video');
  }

  openDescriptionDetail() {
    if (this.showDescriptionDetail) {
      this.showDescriptionDetail = false
      return;
    }
    this.showDescriptionDetail = true;
    this.showComments = false;
  }

  closeDescriptionDetail() {
    this.showDescriptionDetail = false;
  }

  toggleComments() {
    if (!this.showComments && this.recommendedVideosContainer) {
      // Save scroll position before hiding recommended videos
      this.recommendedScrollTop = this.recommendedVideosContainer.nativeElement.scrollTop;
    }
    this.showComments = !this.showComments;
    if (this.showComments) this.showDescriptionDetail = false;
    setTimeout(() => {
      if (!this.showComments && this.recommendedVideosContainer) {
        // Restore scroll position when showing recommended videos again
        this.recommendedVideosContainer.nativeElement.scrollTop = this.recommendedScrollTop;
      }
    });
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({
        avatar: 'https://randomuser.me/api/portraits/men/99.jpg', // fake current user avatar
        username: 'Bạn',
        text: this.newComment
      });
      this.newComment = '';
    }
  }

  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;

  unlikeVideo() {

  }
}
