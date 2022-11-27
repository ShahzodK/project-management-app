import { Component } from '@angular/core';
import { members } from 'src/app/core/constants/members';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  public members = members;
}
