import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() boardTitle = '';

  @Output() back = new EventEmitter();

  public onNavigateBackClick(): void {
    this.back.emit();
  }
}
