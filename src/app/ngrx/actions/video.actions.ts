import {createAction, props} from '@ngrx/store';
import {UploadVideoModel, VideoModel} from '../../models/video.model';

export const uploadVideo = createAction('[Video] Upload Video', props<{
  file: File,
  videoId: string
}>());
export const uploadVideoSuccess = createAction('[Video] Upload Video Success', props<{
  video: VideoModel,
}>());
export const uploadVideoFailure = createAction('[Video] Upload Video Failure', props<{
  error: any,
}>());
export const clearVideoState = createAction('[Video] Clear Video State');

export const getVideoInfo = createAction('[Video] Get Video Info', props<{
  videoId: string
}>());
export const getVideoInfoSuccess = createAction('[Video] Get Video Info Success', props<
  { video: VideoModel }>());
export const getVideoInfoFailure = createAction('[Video] Get Video Info Failure', props<{
  error: any,
}>());

export const createVideoInfo = createAction('[Video] Create Video Info', props<{
  video: UploadVideoModel
}>());
export const createVideoInfoSuccess = createAction('[Video] Create Video Info Success', props<
  { video: VideoModel }>());
export const createVideoInfoFailure = createAction('[Video] Create Video Info Failure', props<{
  error: any,
}>());

export const getLatestVideos = createAction('[Video] Get Latest Videos', props<{
  page: number
}>())
export const getLatestVideosSuccess = createAction('[Video] Get Latest Videos Success', props<
  {
    videos: VideoModel[],
    totalCount: number
  }>());
export const getLatestVideosFailure = createAction('[Video] Get Latest Videos Failure', props<{
  error: any,
}>());

export const getRecommendedVideos = createAction('[Video] Get Recommended Videos')
export const getRecommendedVideosSuccess = createAction('[Video] Get Recommended Videos Success', props<
  { videos: VideoModel[] }>());
export const getRecommendedVideosFailure = createAction('[Video] Get Recommended Videos Failure', props<{
  error: any,
}>());

export const getVideoById = createAction('[Video] Get Video By Id', props<{
  videoId: string
}>());
export const getVideoByIdSuccess = createAction('[Video] Get Video By Id Success', props<
  { video: VideoModel }>());
export const getVideoByIdFailure = createAction('[Video] Get Video By Id Failure', props<{
  error: any,
}>());

export const getNextVideos = createAction('[Video] Get Next Videos', props<{
  page: number,
  videoId: string
}>())
export const getNextVideosSuccess = createAction('[Video] Get Next Videos Success', props<
  {
    videos: VideoModel[],
    totalCount: number
  }>());
export const getNextVideosFailure = createAction('[Video] Get Next Videos Failure', props<{
  error: any,
}>())


export const getLikedVideos = createAction('[Video] Get Liked Videos', props<{
  videoId: string
}>())
export const getLikedVideosSuccess = createAction('[Video] Get Liked Videos Success', props<{
  likesCount: number,
  isLiked: boolean
  isSave: boolean
  commentsCount: number
}>())

export const getLikedVideosFailure = createAction('[Video] Get Liked Videos Failure', props<{
  error: any
}>())

export const getLikeCount = createAction('[Video] Get Like Count', props<{
  videoId: string
}>())
export const getLikeCountSuccess = createAction('[Video] Get Like Count Success', props<{
  likesCount: number,
  isLiked: boolean
}>())
export const getLikeCountFailure = createAction('[Video] Get Like Count Failure', props<{
  error: any
}>())



