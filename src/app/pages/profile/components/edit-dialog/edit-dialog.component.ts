import {Component} from '@angular/core';
import {MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-edit-dialog', // sửa lại selector cho đúng
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
  username: string = '';
  bio: string = '';
  bannerUrl: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>
  ) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    const updatedProfile = {
      username: this.username,
      bio: this.bio,
      bannerUrl: this.bannerUrl
    };
    this.dialogRef.close(updatedProfile);
  }

  onBannerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.bannerUrl = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
