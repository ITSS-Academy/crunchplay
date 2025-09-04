import {Component, computed, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../components/header/header.component';
import {MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StudioSidebarComponent} from '../../components/studio-sidebar/studio-sidebar.component';

@Component({
  selector: 'app-studio',
  imports: [
    RouterOutlet,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    SidebarComponent,
    HeaderComponent,
    StudioSidebarComponent
  ],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.scss'
})
export class StudioComponent {

  collapsed = signal(false);
  isSmallScreen: boolean = false;
  sidebarMode = signal<MatDrawerMode>('side');

  sidebarWidth = computed(() => this.collapsed() ? 'fit-content' : '240px');


  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 599px)']).subscribe(result => {
      this.collapsed.set(result.matches);
      this.sidebarMode.set(result.matches ? 'over' : 'side');
      this.isSmallScreen = result.matches;
    });
  }

  calculateMargin() {
    if (this.isSmallScreen) {
      return '0';
    }
    return this.collapsed() ? '100px' : '240px';
  }

  toggleSidebar() {
    this.collapsed.set(!this.collapsed())
  }

}
