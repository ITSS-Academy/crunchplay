import {Component, Input, OnInit, signal} from '@angular/core';
import {MaterialAngularModule} from '../../modules/material-angular/material-angular.module';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';
import supabase from '../../utils/supabase';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialAngularModule, RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit {
  @Input() collapsed!: boolean

  protected readonly RouterLink = RouterLink;
  protected sections: any

  removeFocus($event: Event) {
    ($event.currentTarget as HTMLElement).blur()
  }

  userId = signal<string | null>(null)

  constructor(private router: Router) {
  }


  ngOnInit() {
    supabase.auth.getUser().then(({data: {user}}) => {
      if (user?.id) {
        this.userId.set(user.id);
        this.updateSections();
      } else {
        this.updateSections();
      }
    });
  }

  updateSections() {
    const uid = this.userId();

    if (!uid) {
      this.sections = [
        {
          // header: 'Main',
          routes: [
            {path: '/home', icon: 'home', label: 'Home'},
            {path: '/exploring', icon: 'explore', label: 'Explore'},
            {path: '/following', icon: 'subscriptions', label: 'Following'},
          ]
        },
      ];
    } else {
      this.sections = [
        {
          // header: 'Main',
          routes: [
            {path: '/home', icon: 'home', label: 'Home'},
            {path: '/exploring', icon: 'explore', label: 'Explore'},
            {path: '/following', icon: 'subscriptions', label: 'Following'},
          ]
        },
        {
          header: 'Library',
          routes: [
            {path: '/history', icon: 'history', label: 'History'},
            {path: uid ? `/profile/${uid}/liked-videos` : '', icon: 'thumb_up', label: 'Liked Videos'},
            {path: uid ? `/profile/${uid}/playlists` : '', icon: 'playlist_play', label: 'Playlist'}
          ]
        },
      ];
    }
  }
}


