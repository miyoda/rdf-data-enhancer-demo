import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdfTermViewerComponent } from './rdf-term-viewer.component';

describe('RdfTermViewerComponent', () => {
  let component: RdfTermViewerComponent;
  let fixture: ComponentFixture<RdfTermViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdfTermViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdfTermViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
