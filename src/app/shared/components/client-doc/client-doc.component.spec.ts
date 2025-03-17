import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDocComponent } from './client-doc.component';

describe('ClientDocComponent', () => {
  let component: ClientDocComponent;
  let fixture: ComponentFixture<ClientDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
