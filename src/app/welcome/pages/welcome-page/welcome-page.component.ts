import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  public members = [
    {
      avatar: 'https://avatars.githubusercontent.com/u/4479289?v=4',
      name: 'core.members.first.name',
      description: 'welcome.members.first.desc',
    },
    {

      avatar: 'https://avatars.githubusercontent.com/u/66957732?s=400&u=54841e02f487bfb3deac9cc8274d1b1ac16e7c40&v=4',
      name: 'core.members.second.name',
      description: 'core.members.second.desc',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/57046438?v=4',
      name: 'core.members.third.name',
      description: 'core.members.third.desc',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/56885229?v=4',
      name: 'core.members.fourth.name',
      description: 'core.members.fourth.desc',
    },
  ];

  constructor(public translateService: TranslateService, public router: Router) {}

}
