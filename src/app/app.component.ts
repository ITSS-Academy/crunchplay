import {Component, computed, signal} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MaterialAngularModule} from './modules/material-angular/material-angular.module';
import {MatDrawerMode} from '@angular/material/sidenav';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, MaterialAngularModule, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Relsvido';

}
