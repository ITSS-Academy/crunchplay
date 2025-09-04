import { Component } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  views: number;
  publishedAt: string;
  thumbnail: string;
  avatar: string;
  duration: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [
    DecimalPipe,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatPaginatorModule
  ]
})
export class SearchComponent {
  q = 'sơn tùng m-tp';
  order: 'relevance' | 'date' | 'viewCount' | 'rating' | 'title' = 'relevance';
  loading = false;
  error: string | null = null;
  total = 0;
  nextToken: string | null = null;
  prevToken: string | null = null;
  items: VideoItem[] = [
    {
      id: '1',
      title: 'Tên video mẫu giống YouTube',
      channel: 'Tên kênh mẫu',
      views: 1234567,
      publishedAt: '1 ngày trước',
      thumbnail: 'https://i.ytimg.com/img/no_thumbnail.jpg',
      avatar: 'https://i.pravatar.cc/40',
      duration: '12:34',
    },
    {
      id: '2',
      title: 'Học Angular 17 Cơ Bản',
      channel: 'F8 Official',
      views: 234567,
      publishedAt: '2 ngày trước',
      thumbnail: 'https://i.ytimg.com/vi/2/0.jpg',
      avatar: 'https://i.pravatar.cc/41',
      duration: '10:21',
    },
    {
      id: '3',
      title: 'Lập trình Fullstack với NodeJS',
      channel: 'Code Dạo',
      views: 345678,
      publishedAt: '3 ngày trước',
      thumbnail: 'https://i.ytimg.com/vi/3/0.jpg',
      avatar: 'https://i.pravatar.cc/42',
      duration: '15:45',
    },
    {
      id: '4',
      title: 'ReactJS cho người mới bắt đầu',
      channel: 'Học Lập Trình',
      views: 456789,
      publishedAt: '4 ngày trước',
      thumbnail: 'https://i.ytimg.com/vi/4/0.jpg',
      avatar: 'https://i.pravatar.cc/43',
      duration: '20:10',
    },
    {
      id: '5',
      title: 'Tự học Python từ A-Z',
      channel: 'Python Master',
      views: 567890,
      publishedAt: '5 ngày trước',
      thumbnail: 'https://i.ytimg.com/vi/5/0.jpg',
      avatar: 'https://i.pravatar.cc/44',
      duration: '18:30',
    },
    {
      id: '6',
      title: 'Khám phá AI cùng Copilot',
      channel: 'AI Channel',
      views: 678901,
      publishedAt: '6 ngày trước',
      thumbnail: 'https://i.ytimg.com/vi/6/0.jpg',
      avatar: 'https://i.pravatar.cc/45',
      duration: '22:05',
    },
  ];
  selectedId: string | null = null;

  chooseOrder(order: typeof this.order) {
    this.order = order;
    // Gọi lại search nếu cần
  }

  search(token?: string) {
    // Thực hiện tìm kiếm, cập nhật state
    // Hiện tại chỉ là mock
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.error = null;
      this.total = 1;
      // Giữ nguyên items mẫu
    }, 500);
  }

  open(id: string) {
    this.selectedId = id;
  }

  closePlayer() {
    this.selectedId = null;
  }

  onPageChange(event: any) {
    // Xử lý phân trang ở đây, ví dụ:
    // this.search(event.pageIndex + 1);
  }
}
