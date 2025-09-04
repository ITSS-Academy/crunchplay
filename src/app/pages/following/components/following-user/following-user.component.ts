import { Component } from '@angular/core';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-following-user',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatIconModule,
    MatButtonModule,
    MatMenuModule

  ],
  templateUrl: './following-user.component.html',
  styleUrl: './following-user.component.scss'
})
export class FollowingUserComponent {

}
