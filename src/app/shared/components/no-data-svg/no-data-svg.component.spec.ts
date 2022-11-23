import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataSvgComponent } from './no-data-svg.component';

describe('NoDataSvgComponent', () => {
  let component: NoDataSvgComponent;
  let fixture: ComponentFixture<NoDataSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoDataSvgComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NoDataSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
