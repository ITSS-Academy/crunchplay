import { Component } from '@angular/core';
import {MatDialogContent, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-playlist-create-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatDialogContent,
    MatFormField,
    MatRadioButton,
    MatRadioGroup,
    MatLabel,
    MatDialogModule
  ],
  templateUrl: './playlist-create-dialog.component.html',
  styleUrl: './playlist-create-dialog.component.scss'
})
export class PlaylistCreateDialogComponent {
  title: string = '';
  description: string = '';
  visibility: 'public' | 'private' = 'public';

  constructor(
    public dialogRef: MatDialogRef<PlaylistCreateDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    const newPlaylist = {
      title: this.title,
      description: this.description,
      visibility: this.visibility
    };
    this.dialogRef.close(newPlaylist);
  }
}
