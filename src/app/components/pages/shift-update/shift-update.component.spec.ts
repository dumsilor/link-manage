import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftUpdateComponent } from './shift-update.component';

describe('ShiftUpdateComponent', () => {
  let component: ShiftUpdateComponent;
  let fixture: ComponentFixture<ShiftUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
