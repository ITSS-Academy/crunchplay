import {Component} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import supabase from '../../utils/supabase';
import {HomeCardComponent} from '../../components/home-card/home-card.component';
import {AuthService} from '../../services/auth/auth.service';
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
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private authService: AuthService) {
  }
  videos: Video[] = [
    {
      id: 1,
      title: 'Học code web',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/43.jpg',
      channel: 'Angular Mastery',
      views: '15K',
      time: '2 ngày trước'
    },
    {
      id: 2,
      title: 'Múa ',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/48.jpg',
      channel: 'Code Dạo',
      views: '32K',
      time: '1 tuần trước'
    },
    {
      id: 3,
      title: 'Faptv nè con',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/50.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 4,
      title: 'Chupapi',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/15.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 5,
      title: 'where are you now ',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/23.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 6,
      title: 'Tiger',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/25.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 7,
      title: 'chilllbro',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/26.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 8,
      title: 'RxJS trong Angular dễ hiểu',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/28.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 9,
      title: 'RxJS trong Angular dễ hiểu',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/32.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 12,
      title: 'RxJS trong Angular dễ hiểu',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/34.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 10,
      title: 'RxJS trong Angular dễ hiểu',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/36.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 11,
      title: 'RxJS trong Angular dễ hiểu',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/38.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
    {
      id: 12,
      title: 'RxJS trong Angular dễ hiểu',
      thumbnail: 'https://cellphones.com.vn/sforum/wp-content/uploads/2022/09/40.jpg',
      channel: 'TechMaster',
      views: '9K',
      time: '3 tuần trước'
    },
  ];
}
