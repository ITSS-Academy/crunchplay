import {Component, Input} from '@angular/core';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatListSubheaderCssMatStyler,
  MatNavList
} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-studio-sidebar',
  imports: [
    MatIconModule,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatListSubheaderCssMatStyler,
    MatNavList,
    RouterLinkActive,
    NgClass,
    RouterLink
  ],
  templateUrl: './studio-sidebar.component.html',
  styleUrl: './studio-sidebar.component.scss'
})
export class StudioSidebarComponent {
  @Input() collapsed!: boolean

  protected readonly sections = sections;
}

const sections = [
  {
    // header: 'Main',
    header: 'Studio',
    routes: [
      {path: '/studio/upload', icon: 'cloud_upload', label: 'Upload'},
      {path: '/studio/analytics', icon: 'insights', label: 'Analytics'},
    ]
  },


];
