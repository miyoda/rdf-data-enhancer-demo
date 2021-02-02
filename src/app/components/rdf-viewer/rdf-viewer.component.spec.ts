import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdfViewerComponent } from './rdf-viewer.component';

describe('RdfViewerComponent', () => {
  let component: RdfViewerComponent;
  let fixture: ComponentFixture<RdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdfViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
