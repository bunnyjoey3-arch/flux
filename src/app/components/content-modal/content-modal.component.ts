import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluxContent } from '../../models/content.model';
import { ContentService } from '../../services/content.service';
import { ContentCardComponent } from '../content-card/content-card.component';

@Component({
  selector: 'flux-content-modal',
  standalone: true,
  imports: [CommonModule, ContentCardComponent],
  templateUrl: './content-modal.component.html',
  styleUrls: ['./content-modal.component.css'],
})
export class ContentModalComponent {
  @Input({ required: true }) item!: FluxContent;
  @Output() close = new EventEmitter<void>();
  @Output() openItem = new EventEmitter<FluxContent>();

  constructor(private contentService: ContentService) {}

  get similar(): FluxContent[] {
    return this.contentService.getSimilar(this.item, 6);
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
