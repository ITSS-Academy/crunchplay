import { Component } from '@angular/core';

@Component({
  selector: 'app-grid',
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
// Biến điều khiển modal
  isManaging = false;

  // Danh sách video (mock data)
  videos = [
    {
      title: 'irl stream in America 🇺🇸',
      channel: 'IShowSpeed',
      views: '22N người đang xem',
      thumbnail: 'https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg'
    },
    {
      title: 'Best moments U23 VN',
      channel: 'FPT Bóng Đá Việt',
      views: '15N lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    },
    {
      title: 'Battlefield 2042 RTX 5080',
      channel: 'RTX Gaming',
      views: '1 lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/9s12a4khtGs/hqdefault.jpg'
    }
  ];

  // Danh sách kênh đang theo dõi
  channels = [
    { name: 'IShowSpeed' },
    { name: 'FPT Bóng Đá Việt' },
    { name: 'RTX Gaming' }
  ];

  // Toggle modal quản lý
  toggleManage() {
    this.isManaging = !this.isManaging;
  }

  // Bỏ theo dõi kênh
  unfollow(channel: any) {
    this.channels = this.channels.filter(c => c !== channel);
    // Có thể lọc video của kênh đó ra khỏi videos luôn
    this.videos = this.videos.filter(v => v.channel !== channel.name);
  }}
