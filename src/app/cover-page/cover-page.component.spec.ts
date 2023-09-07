import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverPageComponent } from './cover-page.component';

describe('CoverPageComponent', () => {
  let component: CoverPageComponent;
  let fixture: ComponentFixture<CoverPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoverPageComponent]
    });
    fixture = TestBed.createComponent(CoverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
