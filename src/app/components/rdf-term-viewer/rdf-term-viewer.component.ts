import { Component, Input, OnInit } from '@angular/core';
import { Prefixes, Quad, Term } from 'n3';
import { ReplaySubject } from 'rxjs';
import { RdfUtilsService } from 'src/app/services/rdf-utils.service';

@Component({
  selector: 'app-rdf-term-viewer',
  templateUrl: './rdf-term-viewer.component.html',
  styleUrls: ['./rdf-term-viewer.component.scss']
})
export class RdfTermViewerComponent implements OnInit {

  @Input()
  term: Term

  @Input()
  prefixes: Prefixes

  @Input()
  termQuadsEmitter: ReplaySubject<Quad>

  label: string = undefined

  constructor(private rdfUtils: RdfUtilsService) { }

  ngOnInit(): void {
    this.termQuadsEmitter.subscribe(quad => {
      if (this.rdfUtils.isLabel(quad.predicate, quad.object)) {
        console.log("label:",quad)
        this.label = quad.object.value
      }
    })
  }

}
