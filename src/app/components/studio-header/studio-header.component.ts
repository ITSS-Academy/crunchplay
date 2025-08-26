import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-studio-header',
  imports: [
    MatButton,
    MatIconModule,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    RouterLink,
    MatMenuTrigger
  ],
  templateUrl: './studio-header.component.html',
  styleUrl: './studio-header.component.scss'
})
export class StudioHeaderComponent {
  @Output() toggleMenuEvent = new EventEmitter();

  headerTitle: string = '';
  canOpenCreateMenu = false;
  @ViewChild('createMenuTrigger', {static: false}) createMenuTrigger?: MatMenuTrigger;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.router.events.subscribe(() => {
      const child = this.activatedRoute.firstChild;
      this.headerTitle = child?.snapshot.data['headerTitle'];
    });
  }

  toggleMenu() {
    this.toggleMenuEvent.emit();
  }

  async openCreateMenu(event: Event, menuTrigger: MatMenuTrigger) {
    event.preventDefault();
    event.stopPropagation();
    if (!(await this.authService.isLoggedIn())) {
      this.dialog.open(LoginDialogComponent, {width: '350px'});
      return;
    }
    this.canOpenCreateMenu = true;
    setTimeout(() => {
      menuTrigger.openMenu();
    });
  }

  onCreateMenuClosed() {
    this.canOpenCreateMenu = false;
  }
}
