import { Component, EventEmitter, OnInit } from '@angular/core';
import { RdfRepositoryService } from '../../services/rdf-repository.service';

import { DataFactory, NamedNode, Prefixes, Quad } from 'n3';
import { ReplaySubject } from 'rxjs';
import { RdfUtilsService } from 'src/app/services/rdf-utils.service';

@Component({
  selector: 'app-rdf-viewer',
  templateUrl: './rdf-viewer.component.html',
  styleUrls: ['./rdf-viewer.component.scss']
})
export class RdfViewerComponent implements OnInit {

  Object = Object

  quadsEmitter = new ReplaySubject<Quad>()
  prefixes: Prefixes = {}
  mainQuad = DataFactory.quad(
    DataFactory.blankNode(),
    DataFactory.namedNode(''),
    DataFactory.namedNode('dicocot:my-query')
  )

  constructor(
    private rdfRepository: RdfRepositoryService,
    private rdfUtils: RdfUtilsService
    ) { }

  ngOnInit(): void {
    this.rdfRepository.prefixes()
      .then(prefixes => {
        this.prefixes = prefixes
        this.loadQuads()
      })
    
      this.quadsEmitter.subscribe(
        (quad) => console.log(quad)
      )
  }

  loadQuads(): void {
    this.rdfRepository.quadsOfCoordiantes(40.36742595009149, -3.6125209663361244)
      .subscribe(
        quad => {
          this.rdfUtils.simplifyPrefixOfQuad(quad, this.prefixes)
          this.quadsEmitter.next(quad)
        },
        err => console.error('ERROR', err),
        () =>  console.log('COMPLETE'),
      )
  }

}
