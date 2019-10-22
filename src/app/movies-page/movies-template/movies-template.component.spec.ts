import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTemplateComponent } from './movies-template.component';

describe('MoviesTemplateComponent', () => {
  let component: MoviesTemplateComponent;
  let fixture: ComponentFixture<MoviesTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
