import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, from, map, mergeMap, Observable, throwError, toArray} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {UploadVideoModel, VideoModel} from '../../models/video.model';
import supabase from '../../utils/supabase';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) {

  }

  getAccessToken() {
    return supabase.auth.getSession()
  }

  chunkVideo(video: File, videoId: string): Observable<any> {
    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(video.size / chunkSize);

    const chunks = Array.from({length: totalChunks}, (_, i) => {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, video.size);
      const chunk = video.slice(start, end);
      return {index: i, chunk};
    });

    let uploadedChunks = 0;

    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        return from(chunks).pipe(
          mergeMap(({index, chunk}) => {
            if (data.error || !data.data.session) {
              return throwError(() => new Error('No access token'));
            }
            const formData = new FormData();

            const fileType = video.type.split('/')[1] || 'bin';

            formData.set('videoName', `${videoId}.${fileType}.part${index}`);
            formData.set('videoId', videoId);
            formData.append('files', chunk, `${videoId}.${fileType}.part${index}`);

            return this.http.post(`${environment.api_base_url}/video/upload`, formData, {
              headers: {
                Authorization: `${data.data.session.access_token}`
              }
            }).pipe(
              map((res) => {
                uploadedChunks++;
                return res;
              }),
              catchError(err => {
                console.error(`❌ Chunk ${index} failed`, err);
                return throwError(() => new Error(`Chunk ${index} failed: ${err.message}`));
              })
            );
          }, totalChunks),
          toArray(),
        );
      })
    )
  }

  mergeChunks(videoId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        if (data.error || !data.data.session) {
          return throwError(() => new Error('No access token'));
        }
        return this.http.post<VideoModel>(`${environment.api_base_url}/video/merge?videoId=${videoId}`, {}, {
          headers: {
            Authorization: `${data.data.session.access_token}`
          }
        });
      })
    )
  }


  getVideoInfo(videoId: string): Observable<VideoModel> {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        if (data.error || !data.data.session) {
          return throwError(() => new Error('No access token'));
        }
        return this.http.get<VideoModel>(`${environment.api_base_url}/video/info/${videoId}`, {
          headers: {
            Authorization: `${data.data.session.access_token}`
          }
        });
      })
    )
  }

  createInfo(data: UploadVideoModel): Observable<VideoModel> {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('categoryId', data.categoryId);
    formData.append('isPublic', String(data.isPublic));
    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail, data.thumbnail.name);
    }

    return from(this.getAccessToken()).pipe(
      mergeMap((authData) => {
        if (authData.error || !authData.data.session) {
          return throwError(() => new Error('No access token'));
        }
        return this.http.post<VideoModel>(`${environment.api_base_url}/video/create-info`, formData, {
          headers: {
            Authorization: `${authData.data.session.access_token}`
          }
        });
      })
    )
  }

  getLatestVideos(
    page: number = 0,
  ) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers: HttpHeaders | undefined = undefined;
        if (data.data.session && !data.error) {
          headers = new HttpHeaders({
            Authorization: `${data.data.session.access_token}`
          });
        }
        return this.http.get<{
          videos: VideoModel[]
          pagination: {
            totalCount: number,
            page: number,
            limit: number,
          }
        }>(`${environment.api_base_url}/video/latest?page=${page}&limit=20`, {
          headers
        });
      }))
  }

  getRecommendedVideos(
    page: number = 0,
  ) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers: HttpHeaders | undefined = undefined;
        if (data.data.session && !data.error) {
          headers = new HttpHeaders({
            Authorization: `${data.data.session.access_token}`
          });
        }
        return this.http.get<{
          videos: VideoModel[]
          pagination: {
            totalCount: number,
            page: number,
            limit: number,
          }
        }>(`${environment.api_base_url}/video/recommendations-based-on-history?page=${page}&limit=10`, {
          headers
        });
      }))
  }

  getVideoById(videoId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers: HttpHeaders | undefined = undefined;
        if (data.data.session && !data.error) {
          headers = new HttpHeaders({
            Authorization: `${data.data.session.access_token}`
          });
        }
        return this.http.get<VideoModel>(`${environment.api_base_url}/video/get-video/${videoId}`, {
          headers
        });
      }))
  }

  getNextVideos(
    videoId: string,
    page: number = 0,
  ) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers: HttpHeaders | undefined = undefined;
        if (data.data.session && !data.error) {
          headers = new HttpHeaders({
            Authorization: `${data.data.session.access_token}`
          });
        }
        return this.http.get<{
          recommendations: VideoModel[]
          pagination: {
            total_count: number,
            current_page_size: number,
          }
        }>(`${environment.api_base_url}/video/recommendations/${videoId}?page=${page}&limit=20`, {
          headers
        });
      }))
  }

  getLikesComments(videoId: string) {
    return from(this.getAccessToken()).pipe(
      mergeMap((data) => {
        let headers: HttpHeaders | undefined = undefined;
        if (data.data.session && !data.error) {
          headers = new HttpHeaders({
            Authorization: `${data.data.session.access_token}`
          });
        }
        return this.http.get<{
          likesCount: number,
          isLiked: boolean,
          comments: any[],
          commentsCount: number,
        }>(`${environment.api_base_url}/video/likes-comments/${videoId}`, {
          headers
        });
      }))
  }
}
