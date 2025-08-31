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
    DatePipe
  ],
  templateUrl: './horizontal-card.component.html',
  styleUrl: './horizontal-card.component.scss'
})
export class HorizontalCardComponent {
  @Input() videoDetail!: VideoModel
  protected readonly convertToSupabaseUrl = convertToSupabaseUrl;
}
