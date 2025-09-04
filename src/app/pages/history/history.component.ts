import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  selectedTab: string = 'all';

  videos = [
    {
      title: 'ERIK - LẠC NHAU CÓ PHẢI MUÔN ĐỜI',
      channel: 'ST.319 Entertainment',
      views: '94 Tr lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/9s12a4khtGs/hqdefault.jpg',
      desc: 'Những hình ảnh, khoảnh khắc bồi hồi về tình yêu của tuổi trẻ...',
      type: 'music'
    },
    {
      title: 'Hẹn Một Mai | Bùi Anh Tuấn | OST 4 Năm 2 Chàng 1 Tình Yêu',
      channel: 'YEAH1 MUSIC',
      views: '64 Tr lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/ZkqLOf8jq8M/hqdefault.jpg',
      desc: 'Tên bài hát: Hẹn Một Mai ✏️ Thể hiện: Bùi Anh Tuấn...',
      type: 'video'
    },
    {
      title: 'Yêu Là "Tha Thứ" | Only C | Em Chưa 18 OST',
      channel: 'YEAH1 MUSIC',
      views: '158 Tr lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/rnvC3m27bRk/hqdefault.jpg',
      desc: 'Yêu Là "Tha Thứ" | Only C | Em Chưa 18 OST Official MV...',
      type: 'music'
    },
    {
      title: 'Âm Thầm Bên Em | Sơn Tùng M-TP',
      channel: 'Sơn Tùng M-TP Official',
      views: '167 Tr lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/ZZxkhA3s8fQ/hqdefault.jpg',
      desc: 'Âm Thầm Bên Em | Official Music Video | Sơn Tùng M-TP...',
      type: 'video'
    },
    {
      title: 'Faded - Alan Walker',
      channel: 'Alan Walker',
      views: '3,5 Tỷ lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/60ItHLz5WEA/hqdefault.jpg',
      desc: 'Faded là một bản hit EDM nổi tiếng toàn cầu của Alan Walker.',
      type: 'music'
    },
    {
      title: 'Podcast: Chuyện nghề Dev',
      channel: 'DevTalks',
      views: '12K lượt nghe',
      thumbnail: 'https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
      desc: 'Podcast chia sẻ về nghề lập trình, kinh nghiệm thực tế.',
      type: 'podcast'
    },
    {
      title: 'Shorts: Mèo nhảy múa',
      channel: 'Funny Animals',
      views: '1,2 Tr lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg',
      desc: 'Video ngắn về chú mèo nhảy múa cực dễ thương.',
      type: 'shorts'
    },
    // Thêm nhiều video mẫu
    {
      title: 'BLACKPINK - How You Like That',
      channel: 'BLACKPINK',
      views: '1,2 Tỷ lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/ioNng23DkIM/hqdefault.jpg',
      desc: 'BLACKPINK trở lại với siêu phẩm How You Like That.',
      type: 'music'
    },
    {
      title: 'Sơn Tùng M-TP | Có Chắc Yêu Là Đây',
      channel: 'Sơn Tùng M-TP Official',
      views: '150 Tr lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/7FjFGACbBFA/hqdefault.jpg',
      desc: 'MV mới nhất của Sơn Tùng M-TP với màu sắc trẻ trung.',
      type: 'video'
    },
    {
      title: 'Podcast: Sống tối giản',
      channel: 'Minimalism Podcast',
      views: '8K lượt nghe',
      thumbnail: 'https://i.ytimg.com/vi/2Vv-BfVoq4g/hqdefault.jpg',
      desc: 'Chia sẻ về lối sống tối giản và hạnh phúc.',
      type: 'podcast'
    },
    {
      title: 'Shorts: Chó cưng chơi bóng',
      channel: 'Pet Shorts',
      views: '900K lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/1La4QzGeaaQ/hqdefault.jpg',
      desc: 'Khoảnh khắc vui nhộn của chú chó chơi bóng.',
      type: 'shorts'
    },
    {
      title: 'Alan Walker - Alone',
      channel: 'Alan Walker',
      views: '1,1 Tỷ lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/1-xGerv5FOk/hqdefault.jpg',
      desc: 'Bản EDM nổi tiếng của Alan Walker.',
      type: 'music'
    },
    {
      title: 'Video: Hướng dẫn ReactJS cho người mới',
      channel: 'F8 Official',
      views: '200K lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg',
      desc: 'Khóa học ReactJS cơ bản miễn phí.',
      type: 'video'
    },
    {
      title: 'Podcast: Tư duy tích cực',
      channel: 'Happy Mind',
      views: '15K lượt nghe',
      thumbnail: 'https://i.ytimg.com/vi/3fumBcKC6RE/hqdefault.jpg',
      desc: 'Cách xây dựng tư duy tích cực mỗi ngày.',
      type: 'podcast'
    },
    {
      title: 'Shorts: Cá vàng bơi lội',
      channel: 'Aquarium Life',
      views: '500K lượt xem',
      thumbnail: 'https://i.ytimg.com/vi/2vjPBrBU-TM/hqdefault.jpg',
      desc: 'Video ngắn về cá vàng bơi lội trong bể.',
      type: 'shorts'
    }
  ];

  filteredVideos() {
    // Debug log để kiểm tra dữ liệu
    console.log('filteredVideos:', this.selectedTab, this.videos.length, this.videos);
    if (this.selectedTab === 'all') return this.videos;
    return this.videos.filter(v => v.type === this.selectedTab);
  }

  setTab(tab: string) {
    this.selectedTab = tab;
  }
}
