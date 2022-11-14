import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  languages: { id: string, title: string }[] = [];

  constructor(
    private translateService: TranslateService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
    this.userService.check();
  }
}
