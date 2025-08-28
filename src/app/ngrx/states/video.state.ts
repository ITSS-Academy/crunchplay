import {VideoModel} from '../../models/video.model';

export interface VideoState {
  isGettingLatest: boolean,
  isGetLatestSuccess: boolean,
  isGetLatestError: any,
  latestVideos: VideoModel[],
  canGetMoreLatest: boolean,

  isGettingRecommended: boolean,
  isGetRecommendedSuccess: boolean,
  isGetRecommendedError: any,
  recommendedVideos: VideoModel[],

  videoDetail: VideoModel,
  isCreating: boolean,
  isCreateError: any,
  isCreateSuccess: boolean,

  isGetting: boolean,
  isGetSuccess: boolean,
  isGetError: any,

  isCreatingInfo: boolean,
  isCreateInfoError: any,
  isCreateInfoSuccess: boolean,
}
