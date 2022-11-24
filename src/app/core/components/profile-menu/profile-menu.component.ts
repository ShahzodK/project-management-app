import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent {
  @Input() public username = '';

  @Input() public isMatMenu!: boolean;

  @Output() public logout = new EventEmitter();

  public onLogout(): void {
    this.logout.emit();
  }
}
