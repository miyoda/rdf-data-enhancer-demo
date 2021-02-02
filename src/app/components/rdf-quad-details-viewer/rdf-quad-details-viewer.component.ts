import { Component, Input, OnInit } from '@angular/core';
import { Prefixes, Quad, Quad_Subject } from 'n3';
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
  mainQuad: Quad

  @Input()
  color: string

  predicateQuadsEmitter: ReplaySubject<Quad>

  objectQuadsEmitter: ReplaySubject<Quad>
  objectInfoQuads: Quad[] = []
  objectSameAsQuads: Quad[] = []

  colorsBySubject = []

  constructor(private rdfUtils: RdfUtilsService) {
    
  }

  ngOnInit(): void {
    this.colorsBySubject[this.mainQuad.object.value] = this.color
    this.predicateQuadsEmitter = this.rdfUtils.collectQuadsOf(this.quadsEmitter, this.mainQuad.predicate)
    this.objectQuadsEmitter = this.rdfUtils.collectQuadsOf(this.quadsEmitter, this.mainQuad.object)
    this.objectQuadsEmitter.subscribe(quad => {
      if (this.rdfUtils.isSame(quad.predicate)) {
        this.objectSameAsQuads.push(quad)
      } else {
        this.objectInfoQuads.push(quad)
      }
    })
  }
  
  getColorOfSubject(subject: Quad_Subject) {
    if (!this.colorsBySubject.hasOwnProperty(subject.value)) {
      this.colorsBySubject[subject.value] = this.getRandomColor()
    }
    return this.colorsBySubject[subject.value]
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
