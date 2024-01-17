import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmationModalComponent } from './edit-confirmation-modal.component';

describe('EditConfirmationModalComponent', () => {
  let component: EditConfirmationModalComponent;
  let fixture: ComponentFixture<EditConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConfirmationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
