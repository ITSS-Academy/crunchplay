import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {VideoService} from '../../services/video/video.service';
import * as VideoActions from '../actions/video.actions';
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs';

export const uploadVideo = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(VideoActions.uploadVideo),
      exhaustMap((action) =>
        videoService.chunkVideo(action.file, action.videoId).pipe(
          switchMap((res) => {
              console.log(res)
              return videoService.mergeChunks(res[0].videoId).pipe(
                map((video) => VideoActions.uploadVideoSuccess({video})),
                catchError((error: any) =>
                  of(VideoActions.uploadVideoFailure({error: error}))
                )
              )
            }
          ),
          catchError((error: any) =>
            of(VideoActions.uploadVideoFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getVideoInfo = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(VideoActions.getVideoInfo),
      exhaustMap((action) =>
        videoService.getVideoInfo(action.videoId).pipe(
          map((video) => VideoActions.getVideoInfoSuccess({video})),
          catchError((error: any) =>
            of(VideoActions.getVideoInfoFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const createVideoInfo = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(VideoActions.createVideoInfo),
      exhaustMap((action) =>
        videoService.createInfo(action.video).pipe(
          map((video) => VideoActions.createVideoInfoSuccess({video})),
          catchError((error: any) =>
            of(VideoActions.createVideoInfoFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getLatestVideos = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(VideoActions.getLatestVideos),
      exhaustMap((action) =>
        videoService.getLatestVideos(action.page).pipe(
          map((res) => VideoActions.getLatestVideosSuccess({
            videos: res.videos,
            totalCount: res.pagination.totalCount
          })),
          catchError((error: any) =>
            of(VideoActions.getLatestVideosFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getRecommendedVideos = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(VideoActions.getRecommendedVideos),
      exhaustMap(() =>
        videoService.getRecommendedVideos().pipe(
          map((res) => {
            console.log(res)
            return VideoActions.getRecommendedVideosSuccess({videos: res.videos})
          }),
          catchError((error: any) =>
            of(VideoActions.getRecommendedVideosFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getVideoById = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(VideoActions.getVideoById),
      exhaustMap((action) =>
        videoService.getVideoById(action.videoId).pipe(
          map((video) => VideoActions.getVideoByIdSuccess({video})),
          catchError((error: any) =>
            of(VideoActions.getVideoByIdFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getNextVideos = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(VideoActions.getNextVideos),
      exhaustMap((action) =>
        videoService.getNextVideos(action.videoId, action.page).pipe(
          map((res) => VideoActions.getNextVideosSuccess({
            videos: res.recommendations,
            totalCount: res.pagination.total_count
          })),
          catchError((error: any) =>
            of(VideoActions.getNextVideosFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);

export const getLikeCommentCount = createEffect(
  (actions$ = inject(Actions), videoService = inject(VideoService)) => {
    return actions$.pipe(
      ofType(VideoActions.getLikeCommentCount),
      exhaustMap((action) =>
        videoService.getLikesComments(action.videoId).pipe(
          map((res) => VideoActions.getLikeCommentCountSuccess({
            video: {
              likeCount: res.likesCount,
              commentCount: res.commentsCount,
              isLiked: res.isLiked,
            }
          })),
          catchError((error: any) =>
            of(VideoActions.getLikeCommentCountFailure({error: error}))
          )
        )
      )
    );
  },
  {functional: true}
);
