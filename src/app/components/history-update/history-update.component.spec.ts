import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryUpdateComponent } from './history-update.component';

describe('HistoryUpdateComponent', () => {
  let component: HistoryUpdateComponent;
  let fixture: ComponentFixture<HistoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
