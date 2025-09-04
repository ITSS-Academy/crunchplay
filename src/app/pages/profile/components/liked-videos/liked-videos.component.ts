import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-liked-videos',
  imports: [MatCardModule],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.scss'
})
export class LikedVideosComponent {
  videos = [
    {
      title: 'Angular Material 3 Tutorial',
      thumbnail: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_5_29_638209992395613788_frame-218.png',
      views: '15K',
      date: '2 days ago'
    },
    {
      title: 'Build YouTube Clone with Angular',
      thumbnail: 'https://ocafe.net/wp-content/uploads/2024/10/anh-nen-dep-1.jpg',
      views: '32K',
      date: '1 week ago'
    },
    {
      title: 'Anh biết rồi',
      thumbnail: 'https://ocafe.net/wp-content/uploads/2024/10/anh-nen-dep-2.jpg',
      views: '90tr',
      date: '3 weeks ago'
    }, // 👈 thiếu dấu phẩy ở đây
    {
      title: 'Chupapi',
      thumbnail: 'https://cdn.eva.vn/upload/3-2022/images/2022-08-10/hinh-anh-kha-banh-trong-tu-len-song-truyen-hinh-lam-day-song-cdm-295979644_3299872920253693_3286160852329932479_n-1660096764-49-width780height416.png',
      views: '9tr',
      date: '5 weeks ago'
    }, // 👈 ở đây cũng thiếu
  ];
}
