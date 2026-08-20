import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluxContent } from '../../models/content.model';

@Component({
  selector: 'flux-content-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css'],
})
export class ContentCardComponent {
  @Input({ required: true }) item!: FluxContent;
  @Output() open = new EventEmitter<FluxContent>();

  onActivate(): void {
    this.open.emit(this.item);
  }
}
