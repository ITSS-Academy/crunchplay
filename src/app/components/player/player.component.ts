import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import Hls from 'hls.js';
import Plyr from 'plyr';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements AfterViewInit {
  @Input() videoSrc!: string;

  @ViewChild('videoRef', {static: true}) videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    const video = this.videoRef.nativeElement;
    const hls = new Hls();

    hls.loadSource(this.videoSrc);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      const availableQualities = data.levels.map(l => l.height).sort((a, b) => b - a);
      const player = new Plyr(video, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['quality', 'speed'],
        quality: {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (newQuality) => {
            const levelIndex = data.levels.findIndex(l => l.height === newQuality);
            hls.currentLevel = levelIndex;
          }
        },
        speed: {
          options: [0.5, 1, 1.5, 2],
          selected: 1
        },
        keyboard: {
          focused: true,
          global: true
        }
      });
    });
  }
}
