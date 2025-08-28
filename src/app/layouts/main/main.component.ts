import {AfterViewInit, Component, computed, signal, ViewChild} from '@angular/core';
import {MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {BreakpointObserver} from '@angular/cdk/layout';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-main',
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements AfterViewInit {
  collapsed = signal(false);
  isSmallScreen: boolean = false;
  sidebarMode = signal<MatDrawerMode>('side');
  isVideoDetailPage: boolean = false;

  sidebarWidth = computed(() => this.collapsed() ? 'fit-content' : '240px');
  @ViewChild('drawer') drawer!: MatSidenav;


  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private activatedRoute: ActivatedRoute) {


    this.breakpointObserver.observe(['(max-width: 599px)']).subscribe(result => {
      this.collapsed.set(result.matches);
      if (!this.isVideoDetailPage) {
        this.sidebarMode.set(result.matches ? 'over' : 'side');
      }
      this.isSmallScreen = result.matches;
    });
  }

  ngAfterViewInit() {
    this.router.events.subscribe(() => {
      const child = this.activatedRoute.firstChild;
      this.isVideoDetailPage = child?.snapshot.data['headerTitle'] === 'Video Detail';
      if (this.isVideoDetailPage) {
        this.sidebarMode.set('over');
        this.drawer.close().then(
          () => {
            this.collapsed.set(false)
          }
        )

      } else {
        this.sidebarMode.set(this.isSmallScreen ? 'over' : 'side');
        if (!this.isSmallScreen && !this.collapsed()) {
          this.drawer.open();
        }
      }
    });
  }

  calculateMargin() {
    if (this.isVideoDetailPage) {
      return '0';
    }
    if (this.isSmallScreen) {
      return '0';
    }
    return this.collapsed() ? '100px' : '240px';
  }

  toggleSidebar() {
    if (this.sidebarMode() === 'over') {
      this.drawer.toggle();
    } else {
      this.collapsed.set(!this.collapsed())
    }
  }

}
