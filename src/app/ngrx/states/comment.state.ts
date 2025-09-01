export interface CommentState {
  isCreating: boolean;
  isCreateSuccess: boolean;
  isCreateError: any;
  isGettingByVideoId: boolean;
  isGetByVideoIdSuccess: boolean;
  isGetByVideoIdError: any;
  commentsByVideoId: any[];
}
