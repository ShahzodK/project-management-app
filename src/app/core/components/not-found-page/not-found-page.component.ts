import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FullRoutePaths } from '../../consts/routes.const';


@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  public readonly MAIN_ROUTE_PATH = FullRoutePaths.MAIN;

  constructor(
    private router: Router,
    public translateService: TranslateService,
  ) {}

  public goBackOnMain(link: string): void {
    this.router.navigate([link]);
  }

}
