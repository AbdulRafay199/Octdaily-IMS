import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DltConfirmationModalComponent } from './dlt-confirmation-modal.component';

describe('DltConfirmationModalComponent', () => {
  let component: DltConfirmationModalComponent;
  let fixture: ComponentFixture<DltConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DltConfirmationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DltConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
