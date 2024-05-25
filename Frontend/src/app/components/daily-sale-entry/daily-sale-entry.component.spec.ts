import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySaleEntryComponent } from './daily-sale-entry.component';

describe('DailySaleEntryComponent', () => {
  let component: DailySaleEntryComponent;
  let fixture: ComponentFixture<DailySaleEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailySaleEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailySaleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
