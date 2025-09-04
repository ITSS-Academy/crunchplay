import {Component, Input} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {DatePipe, DecimalPipe, NgForOf} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {VideoModel} from '../../models/video.model';
import {DurationPipe} from '../../pipes/duration.pipe';
import {convertToSupabaseUrl} from '../../utils/img-converter';
import {PlayerComponent} from '../player/player.component';

@Component({
  selector: 'app-horizontal-card',
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardImage,
    MatIconModule,
    MatIconButton,
    NgForOf,
    RouterLink,
    MatCardHeader,
    DurationPipe,
    MatCardModule,
    DecimalPipe,
    DatePipe,
    PlayerComponent
  ],
  templateUrl: './horizontal-card.component.html',
  styleUrl: './horizontal-card.component.scss'
})
export class HorizontalCardComponent {
  @Input() videoDetail!: VideoModel
  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;

  showVideoPreview = false;
  private previewTimeout: NodeJS.Timeout | null = null;

  onDragEnter() {
    if (!this.showVideoPreview && !this.previewTimeout) {
      console.log("Start preview timer");
      this.previewTimeout = setTimeout(() => {
        console.log("Show preview");
        this.showVideoPreview = true;
        this.previewTimeout = null;
      }, 1000);
    }
  }

  onDragLeave() {
    if (this.previewTimeout) {
      clearTimeout(this.previewTimeout);
      this.previewTimeout = null;
    }
    this.showVideoPreview = false;
  }
}
