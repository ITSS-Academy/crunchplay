import {VideoState} from '../states/video.state';
import {VideoModel} from '../../models/video.model';
import {createReducer, on} from '@ngrx/store';
import * as VideoActions from '../actions/video.actions';

const initialState: VideoState = {
  isGettingLatest: false,
  isGetLatestSuccess: false,
  isGetLatestError: null,
  latestVideos: [] as VideoModel[],
  canGetMoreLatest: true,

  isGettingRecommended: false,
  isGetRecommendedSuccess: false,
  isGetRecommendedError: null,
  recommendedVideos: [] as VideoModel[],

  videoDetail: {} as VideoModel,
  isCreating: false,
  isCreateError: null,
  isCreateSuccess: false,

  isGetError: null,
  isGetting: false,
  isGetSuccess: false,

  isCreatingInfo: false,
  isCreateInfoError: null,
  isCreateInfoSuccess: false,
}

export const videoReducer = createReducer(
  initialState,
  on(VideoActions.uploadVideo, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
      isCreateError: null,
      isCreateSuccess: false,
    }
  }),
  on(VideoActions.uploadVideoSuccess, (state, {video}) => {
    return {
      ...state,
      videoDetail: video,
      isCreating: false,
      isCreateError: false,
      isCreateSuccess: true,
    }
  }),
  on(VideoActions.uploadVideoFailure, (state, {error}) => {
    return {
      ...state,
      isCreating: false,
      isCreateError: error,
      isCreateSuccess: false,
    }
  }),
  on(VideoActions.clearVideoState, (state) => {
    return initialState
  }),
  on(VideoActions.getVideoInfo, (state, {videoId, type}) => {
    console.log(type);
    return {
      ...state,
      isGetting: true,
      isGetError: null,
      isGetSuccess: false,
    }
  }),
  on(VideoActions.getVideoInfoSuccess, (state, {video}) => {
    return {
      ...state,
      videoDetail: video,
      isGetting: false,
      isGetError: null,
      isGetSuccess: true,
    }
  }),
  on(VideoActions.getVideoInfoFailure, (state, {error}) => {
    return {
      ...state,
      isGetting: false,
      isGetError: error,
      isGetSuccess: false,
    }
  }),
  on(VideoActions.createVideoInfo, (state, {video, type}) => {
    console.log(type);
    return {
      ...state,
      isCreatingInfo: true,
      isCreateInfoError: null,
      isCreateInfoSuccess: false,
    }
  }), on(VideoActions.createVideoInfoSuccess, (state, {video}) => {
    return {
      ...state,
      videoDetail: video,
      isCreatingInfo: false,
      isCreateInfoError: null,
      isCreateInfoSuccess: true,
    }
  }),
  on(VideoActions.createVideoInfoFailure, (state, {error}) => {
    return {
      ...state,
      isCreatingInfo: false,
      isCreateInfoError: error,
      isCreateInfoSuccess: false,
    }
  }),
  on(VideoActions.getLatestVideos, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isGettingLatest: true,
      isGetLatestSuccess: false,
      isGetLatestError: null,
    }
  }),
  on(VideoActions.getLatestVideosSuccess, (state, {videos, totalCount}) => {
    return {
      ...state,
      latestVideos: [...state.latestVideos, ...videos],
      canGetMoreLatest: state.latestVideos.length < totalCount,
      isGettingLatest: false,
      isGetLatestSuccess: true,
      isGetLatestError: null,
    }
  }),
  on(VideoActions.getLatestVideosFailure, (state, {type, error}) => {
    console.log(type);
    return {
      ...state,
      isGettingLatest: false,
      isGetLatestSuccess: false,
      isGetLatestError: error,
    }
  }),
  on(VideoActions.getRecommendedVideos, (state, {type}) => {
    console.log(type);
    return {
      ...state,
      isGettingRecommended: true,
      isGetRecommendedSuccess: false,
      isGetRecommendedError: null,
    }
  }),
  on(VideoActions.getRecommendedVideosSuccess, (state, {videos, type}) => {
    console.log(type);
    return {
      ...state,
      recommendedVideos: videos,
      isGettingRecommended: false,
      isGetRecommendedSuccess: true,
      isGetRecommendedError: null,
    }
  }),
  on(VideoActions.getRecommendedVideosFailure, (state, {error, type}) => {
    console.log(type);
    return <VideoState>{
      ...state,
      isGettingRecommended: false,
      isGetRecommendedSuccess: false,
      isGetRecommendedError: error,
    }
  })
);
