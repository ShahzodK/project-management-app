import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FullRoutePaths } from '../../constants/routes';


@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {

  constructor(
    private router: Router,
  ) {}

  public redirectToMain(): void {
    this.router.navigate([FullRoutePaths.MAIN]);
  }

}
