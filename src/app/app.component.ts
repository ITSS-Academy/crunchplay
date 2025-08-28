import {Component, computed, signal} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MaterialAngularModule} from './modules/material-angular/material-angular.module';
import {MatDrawerMode} from '@angular/material/sidenav';
import {HeaderComponent} from './components/header/header.component';
import supabase from './utils/supabase';
import {logout, storeAuth} from './ngrx/actions/auth.actions';
import {AuthState} from './ngrx/states/auth.state';
import {Store} from '@ngrx/store';
import {AuthModel} from './models/auth.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, MaterialAngularModule, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Relsvido';

  constructor(
    private store: Store<{ auth: AuthState }>
  ) {
    const {data} = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      if (event === 'SIGNED_IN') {
        console.log(session?.user)
        this.store.dispatch(storeAuth({auth: session as AuthModel}));

      } else if (event === 'SIGNED_OUT') {
        this.store.dispatch(logout());
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      }
    })
  }

}
