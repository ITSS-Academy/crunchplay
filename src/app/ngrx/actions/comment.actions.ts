import {createAction, props} from '@ngrx/store';

export const createComment = createAction('[Comment] Create Comment', props<{
  videoId: string,
  content: string
}>())
export const createCommentSuccess = createAction('[Comment] Create Comment Success', props<{
  comment: any
}>())
export const createCommentFailure = createAction('[Comment] Create Comment Failure', props<{
  error: any
}>())

export const getCommentsByVideoId = createAction('[Comment] Get Comments By Video Id', props<{
  videoId: string
}>())
export const getCommentsByVideoIdSuccess = createAction('[Comment] Get Comments By Video Id Success', props<{
  comments: any[]
}>())
export const getCommentsByVideoIdFailure = createAction('[Comment] Get Comments By Video Id Failure', props<{
  error: any
}>())

export const clearCommentState = createAction('[Comment] Clear Comment State')
