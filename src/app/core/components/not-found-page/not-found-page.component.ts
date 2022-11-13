import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent {

  constructor(
    private router: Router,
    private translateService: TranslateService,
  ) {}

  public goBackOnMain(link: string): void {
    this.router.navigate([link]);
  }

}
