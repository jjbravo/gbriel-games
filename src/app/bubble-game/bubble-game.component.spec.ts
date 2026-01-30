import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleGameComponent } from './bubble-game.component';

describe('BubbleGameComponent', () => {
  let component: BubbleGameComponent;
  let fixture: ComponentFixture<BubbleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BubbleGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
