import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  time: string;
}


@Component({
  selector: 'app-video',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {
  likedVideos: Video[] = [
    {
      id: 1,
      title: 'Jack 5 . ',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/11.jpg',
      channel: 'Angular VN',
      views: '1.2M lượt xem',
      time: '2 tuần trước'
    },
    {
      id: 2,
      title: 'Solo cùng Ahri',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/10.jpg',
      channel: 'Code Dạo',
      views: '950K lượt xem',
      time: '1 tháng trước'
    },
    {
      id: 3,
      title: 'Cách múa yasou vip pro',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/8.jpg',
      channel: 'TechMaster',
      views: '800K lượt xem',
      time: '3 tháng trước'
    }
  ];
}
