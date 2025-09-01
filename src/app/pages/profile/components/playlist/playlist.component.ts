import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  playlists = [
    {
      title: 'Học cách thắng faker',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/41.jpg',
      videos: 25
    },
    {
      title: 'Học cách chơi faker cơ bản',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/2.jpg',
      videos: 12
    },
    {
      title: 'Lofi để học tập',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/3.jpg',
      videos: 40
    }
  ];
}
