import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdfQuadDetailsViewerComponent } from './rdf-quad-details-viewer.component';

describe('RdfQuadDetailsViewerComponent', () => {
  let component: RdfQuadDetailsViewerComponent;
  let fixture: ComponentFixture<RdfQuadDetailsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdfQuadDetailsViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdfQuadDetailsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
