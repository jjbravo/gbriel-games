import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VowelsComponent } from './vowels.component';

describe('GameOneComponent', () => {
  let component: VowelsComponent;
  let fixture: ComponentFixture<VowelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VowelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VowelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
