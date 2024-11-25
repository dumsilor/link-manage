import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMansLandComponent } from './no-mans-land.component';

describe('NoMansLandComponent', () => {
  let component: NoMansLandComponent;
  let fixture: ComponentFixture<NoMansLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoMansLandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMansLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
