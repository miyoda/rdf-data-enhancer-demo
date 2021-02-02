import { Injectable } from '@angular/core';
import { DataFactory, NamedNode, Prefixes, Quad, Quad_Object, Quad_Predicate, Term } from 'n3';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RdfUtilsService {

  constructor() { }



  extendPrefixOfQuad(quad: Quad, prefixes: Prefixes): void {
    if (quad.subject.termType == 'NamedNode') quad.subject = this.extendPrefixOfNamedNode(quad.subject, prefixes)
    if (quad.predicate.termType == 'NamedNode') quad.predicate = this.extendPrefixOfNamedNode(quad.predicate, prefixes)
    if (quad.object.termType == 'NamedNode') quad.object = this.extendPrefixOfNamedNode(quad.object, prefixes)
  }

  simplifyPrefixOfQuad(quad: Quad, prefixes: Prefixes): void {
    if (quad.subject.termType == 'NamedNode') quad.subject = this.simplifyPrefixOfNamedNode(quad.subject, prefixes)
    if (quad.predicate.termType == 'NamedNode') quad.predicate = this.simplifyPrefixOfNamedNode(quad.predicate, prefixes)
    if (quad.object.termType == 'NamedNode') quad.object = this.simplifyPrefixOfNamedNode(quad.object, prefixes)
  }

  extendPrefixOfNamedNode(namedNode: NamedNode, prefixes: Prefixes): NamedNode {
    for (let prefixKey of Object.keys(prefixes)) {
      if (namedNode.value.startsWith(prefixKey + ':')) {
        return DataFactory.namedNode(prefixes[prefixKey].value + namedNode.value.substring(prefixKey.length + 1))
      }
    }
    return namedNode
  }

  simplifyPrefixOfNamedNode(namedNode: NamedNode, prefixes: Prefixes): NamedNode {
    for (let prefixKey of Object.keys(prefixes)) {
      if (namedNode.value.startsWith(prefixes[prefixKey].value)) {
        return DataFactory.namedNode(prefixKey + ':' + namedNode.value.substring(prefixes[prefixKey].value.length))
      }
    }
    return namedNode
  }

  collectQuadsOf(quadsEmitter: ReplaySubject<Quad>, term: Term): ReplaySubject<Quad> {
    const resultEmitter = new ReplaySubject<Quad>()
    quadsEmitter.subscribe(
      quad => {
        if (quad.subject.equals(term)) {
          resultEmitter.next(quad)
          if (this.isSame(quad.predicate)) {
            this.collectQuadsOf(quadsEmitter, quad.object).subscribe(
              sameQuad => resultEmitter.next(sameQuad)
            )
          }
        }
      },
      err => resultEmitter.error(err),
      () => resultEmitter.complete()
    )
    return resultEmitter
  }

  isSame(term: Quad_Predicate) {
    return term.value == 'owl:sameAs'
  }

  isLabel(termPredicate: Quad_Predicate, termObject: Quad_Object): boolean {
    return termPredicate.value == 'dcterms:title' || 
      (termPredicate.value == 'rdfs:label' && this.isLanguageEq(termObject, 'en'))
  }

  isLanguageEq(termObject: Quad_Object, language: string): boolean {
    if (termObject.termType == 'Literal') {
      return termObject.language == language
    }
    return false
  }
}
