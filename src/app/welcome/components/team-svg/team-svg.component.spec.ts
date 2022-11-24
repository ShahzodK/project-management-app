import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSvgComponent } from './team-svg.component';

describe('TeamSvgComponent', () => {
  let component: TeamSvgComponent;
  let fixture: ComponentFixture<TeamSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamSvgComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeamSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
