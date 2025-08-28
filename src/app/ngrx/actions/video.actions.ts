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
