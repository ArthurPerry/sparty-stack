import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewedComponent } from './page-viewed.component';

describe('PageViewedComponent', () => {
  let component: PageViewedComponent;
  let fixture: ComponentFixture<PageViewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageViewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
