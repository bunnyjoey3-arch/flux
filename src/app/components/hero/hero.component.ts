import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluxContent } from '../../models/content.model';

@Component({
  selector: 'flux-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent {
  @Input({ required: true }) item!: FluxContent;
  @Output() play = new EventEmitter<FluxContent>();
  @Output() moreInfo = new EventEmitter<FluxContent>();
}
