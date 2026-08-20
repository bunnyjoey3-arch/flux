import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluxContent } from '../../models/content.model';
import { ContentCardComponent } from '../content-card/content-card.component';

@Component({
  selector: 'flux-content-row',
  standalone: true,
  imports: [CommonModule, ContentCardComponent],
  templateUrl: './content-row.component.html',
  styleUrls: ['./content-row.component.css'],
})
export class ContentRowComponent {
  @Input() eyebrow = '';
  @Input({ required: true }) title = '';
  @Input({ required: true }) items: FluxContent[] = [];
  @Output() open = new EventEmitter<FluxContent>();

  @ViewChild('track') track?: ElementRef<HTMLDivElement>;

  scroll(direction: 1 | -1): void {
    const el = this.track?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' });
  }

  trackById(_: number, item: FluxContent): string | number {
    return (item as any).id ?? _;
  }
}
