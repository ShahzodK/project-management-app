import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardFormComponent } from './create-board-form.component';

describe('CreateBoardFormComponent', () => {
  let component: CreateBoardFormComponent;
  let fixture: ComponentFixture<CreateBoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBoardFormComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
