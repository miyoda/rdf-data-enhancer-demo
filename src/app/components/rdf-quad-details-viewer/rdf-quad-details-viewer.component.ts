import { Component, Input, OnInit } from '@angular/core';
import { Prefixes, Quad } from 'n3';
import { BehaviorSubject, ReplaySubject, Subject, Subscriber } from 'rxjs';
import { RdfUtilsService } from 'src/app/services/rdf-utils.service';

@Component({
  selector: 'app-rdf-quad-details-viewer',
  templateUrl: './rdf-quad-details-viewer.component.html',
  styleUrls: ['./rdf-quad-details-viewer.component.scss']
})
export class RdfQuadDetailsViewerComponent implements OnInit {

  @Input()
  quadsEmitter: ReplaySubject<Quad>

  @Input()
  prefixes: Prefixes

  @Input()
  quad: Quad

  predicateQuadsEmitter: ReplaySubject<Quad>

  objectQuadsEmitter: ReplaySubject<Quad>
  objectInfoQuads: Quad[] = []
  objectSameAsQuads: Quad[] = []

  constructor(private rdfUtils: RdfUtilsService) {
    
  }

  ngOnInit(): void {
    this.predicateQuadsEmitter = this.rdfUtils.collectQuadsOf(this.quadsEmitter, this.quad.predicate)
    this.objectQuadsEmitter = this.rdfUtils.collectQuadsOf(this.quadsEmitter, this.quad.object)
    this.objectQuadsEmitter.subscribe(quad => {
      if (this.rdfUtils.isSame(quad.predicate)) {
        this.objectSameAsQuads.push(quad)
      } else {
        this.objectInfoQuads.push(quad)
      }
    })
  }

}
