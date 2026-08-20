import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'flux-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  year = new Date().getFullYear();

  readonly columns = [
    {
      heading: 'Browse',
      links: ['Movies', 'Series', 'Anime', 'Documentaries', 'New releases'],
    },
    {
      heading: 'Account',
      links: ['My list', 'Profiles', 'Playback settings', 'Download for offline'],
    },
    {
      heading: 'Company',
      links: ['About Flux', 'Careers', 'Press', 'Newsroom'],
    },
    {
      heading: 'Support',
      links: ['Help center', 'Device support', 'Accessibility', 'Contact us'],
    },
  ];
}
