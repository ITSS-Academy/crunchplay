import {Component} from '@angular/core';
import {PlayerComponent} from '../../components/player/player.component';

@Component({
  selector: 'app-video-detail',
  imports: [
    PlayerComponent
  ],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.scss'
})
export class VideoDetailComponent {

}
