import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportanttaskComponent } from './importanttask.component';

describe('ImportanttaskComponent', () => {
  let component: ImportanttaskComponent;
  let fixture: ComponentFixture<ImportanttaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportanttaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportanttaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
