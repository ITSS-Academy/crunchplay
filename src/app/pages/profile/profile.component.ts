import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatTab, MatTabGroup, MatTabLabel, MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {VideoComponent} from './components/video/video.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {LikedVideosComponent} from './components/liked-videos/liked-videos.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {EditDialogComponent} from './components/edit-dialog/edit-dialog.component';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-profile',
  imports: [
    MatIconModule,
    MatTabsModule,
    VideoComponent,
    MatButtonModule,
    PlaylistComponent,
    LikedVideosComponent,
    MatDialogModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  tabRoutes = ['videos', 'playlists', 'liked-videos'];
  selectedIndex = 0;
  subscription: Subscription[] = []

  // mat-dialog
  readonly dialog = inject(MatDialog);


  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscription.push(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
        const child = this.route.firstChild;
        const path = child?.snapshot.routeConfig?.path;
        const idx = this.tabRoutes.indexOf(path || 'all');
        this.selectedIndex = idx === -1 ? 0 : idx;
      })
    );
  }

  ngOnInit() {

  }

  openEditProfile() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '420px',
      height: 'fit-content',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
    this.subscription = [];
  }

  onTabChange(idx: number) {
    const route = this.tabRoutes[idx];
    this.router.navigate([route], {relativeTo: this.route});
  }
}
