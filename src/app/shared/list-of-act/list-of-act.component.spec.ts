import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfActComponent } from './list-of-act.component';

describe('ListOfActComponent', () => {
  let component: ListOfActComponent;
  let fixture: ComponentFixture<ListOfActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
