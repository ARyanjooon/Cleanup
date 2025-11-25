import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollecationComponent } from './collecation.component';

describe('CollecationComponent', () => {
  let component: CollecationComponent;
  let fixture: ComponentFixture<CollecationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollecationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollecationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
