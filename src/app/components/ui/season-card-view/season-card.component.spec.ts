import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonCardComponent } from './season-card.component';

describe('SeasonCardComponent', () => {
  let component: SeasonCardComponent;
  let fixture: ComponentFixture<SeasonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
