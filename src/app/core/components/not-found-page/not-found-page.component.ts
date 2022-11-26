import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FullRoutePaths } from '../../constants/routes';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  public readonly MAIN_ROUTE_PATH = FullRoutePaths.MAIN;

  constructor(
    private router: Router,
  ) {}

  public goBackOnMain(link: string): void {
    this.router.navigate([link]);
  }

}
