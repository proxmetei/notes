import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsectionComponent } from './modalsection.component';

describe('ModalsectionComponent', () => {
  let component: ModalsectionComponent;
  let fixture: ComponentFixture<ModalsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
