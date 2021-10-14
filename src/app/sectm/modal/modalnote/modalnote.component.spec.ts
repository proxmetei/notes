import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalnoteComponent } from './modalnote.component';

describe('ModalnoteComponent', () => {
  let component: ModalnoteComponent;
  let fixture: ComponentFixture<ModalnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
