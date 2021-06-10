import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCreateComponent } from './history-create.component';

describe('HistoryCreateComponent', () => {
  let component: HistoryCreateComponent;
  let fixture: ComponentFixture<HistoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
