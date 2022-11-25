import { Component } from '@angular/core';
import { members } from '../../constants/members';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public members = members;
}
