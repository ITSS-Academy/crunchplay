import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/states/auth.state';
import {catchError, from, map, mergeMap, Observable, throwError, toArray} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {environment} from '../../environments/environment.development';
import {UploadVideoModel, VideoModel} from '../../models/video.model';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  accessToken!: string

  constructor(private http: HttpClient, private store: Store<{
    auth: AuthState
  }>) {
    this.store.select(state => state.auth.auth.access_token).subscribe(accessToken => {
      this.accessToken = accessToken || ''
    })
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

    return from(chunks).pipe(
      mergeMap(({index, chunk}) => {
        const formData = new FormData();

        const fileType = video.type.split('/')[1] || 'bin';

        formData.set('videoName', `${videoId}.${fileType}.part${index}`);
        formData.set('videoId', videoId);
        formData.append('files', chunk, `${videoId}.${fileType}.part${index}`);

        return this.http.post(`${environment.api_base_url}/video/upload`, formData, {
          headers: {
            Authorization: `${this.accessToken}`
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
  }

  mergeChunks(videoId: string) {
    console.log(this.accessToken)
    return this.http.post<VideoModel>(`${environment.api_base_url}/video/merge?videoId=${videoId}`, {}, {
      headers: {
        Authorization: `${this.accessToken}`
      }
    });

  }

  getVideoInfo(videoId: string): Observable<VideoModel> {
    return this.http.get<VideoModel>(`${environment.api_base_url}/video/info/${videoId}`, {
      headers: {
        Authorization: `${this.accessToken}`
      }
    });
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

    return this.http.post<VideoModel>(`${environment.api_base_url}/video/create-info`, formData, {
      headers: {
        Authorization: `${this.accessToken}`
      }
    });
  }
}
