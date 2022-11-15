import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleTogglerComponent } from './locale-toggler.component';

describe('LocaleTogglerComponent', () => {
  let component: LocaleTogglerComponent;
  let fixture: ComponentFixture<LocaleTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaleTogglerComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LocaleTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
