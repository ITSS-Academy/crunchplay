import {AfterViewInit, Component, ElementRef, Input, ViewChild, OnDestroy} from '@angular/core';
import Hls from 'hls.js';
import Plyr from 'plyr';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
  @Input() videoSrc!: string;
  @Input() posterSrc!: string;

  @ViewChild('videoRef', {static: true}) videoRef!: ElementRef<HTMLVideoElement>;

  private hls?: Hls;
  private player?: Plyr;

  ngAfterViewInit() {
    const video = this.videoRef.nativeElement;
    const hls = new Hls();

    // Clean up previous instances if any
    if (this.hls) {
      this.hls.destroy();
    }
    if (this.player) {
      this.player.destroy();
    }

    this.hls = hls;

    // Log the videoSrc and posterSrc for debugging
    console.log('videoSrc:', this.videoSrc);
    console.log('posterSrc:', this.posterSrc);


    hls.loadSource(this.videoSrc);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      const availableQualities = data.levels.map(l => l.height).sort((a, b) => b - a);
      const player = new Plyr(video, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['quality', 'speed'],
        autoplay: false,
        previewThumbnails: {
          src: this.posterSrc,
          enabled: false
        },
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
      this.player = player;
      // Add Plyr event logging
      player.on('error', (event) => {
        console.error('Plyr error event:', event);
      })
    });
    this.hls.on(Hls.Events.ERROR, (event, data) => {
      console.error('HLS.js error:', data);
    });

  }

  ngOnDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
    if (this.player) {
      this.player.destroy();
    }
  }
}
