import { Component } from '@angular/core';
import { FullRoutePaths } from '../../constants/routes';


@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {
  public MAIN_ROUTE_PATH = '/' + FullRoutePaths.MAIN;
}
