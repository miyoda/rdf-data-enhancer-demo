import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Parser, Prefixes, Quad } from "n3"

@Injectable({
  providedIn: 'root'
})
export class RdfRepositoryService {

  constructor(private http: HttpClient) { }

  public prefixes(): Promise<Prefixes> {
    return this.http.get<Prefixes>('http://localhost:8080/prefixes').toPromise()
  } 

  public quadsOfCoordiantes(latitude: number, longitude: number): Observable<Quad> {
    const parser = new Parser({ format: 'N-Triples' })
    return this.eventNTriplesOfCoordinates(latitude, longitude).pipe(
      mergeMap((nTriple) => this.parse(parser, nTriple))
    )
  }

  private parse(parser: Parser, nTriple: string): Observable<Quad>{
    return new Observable<Quad>((observer) => {
      console.log("nTriple:",nTriple)
      parser.parse(nTriple, (error: Error, quad: Quad, prefixes: Prefixes) => {
        //console.log("Error ", error, ". Quad ", quad, ". Prefixes ", prefixes);
        if (quad) observer.next(quad); observer.complete()
      })
    })
  }

  private eventNTriplesOfCoordinates(latitude: number, longitude: number): Observable<string> {
    const es = new EventSource(`http://localhost:8080/stream/coordinates?latitude=${latitude}&longitude=${longitude}`)

    return new Observable((observer) => {
      es.addEventListener("open", (event) => {
        console.log("EventSource.open: ", event)
      });
      es.addEventListener("message", (event) => {
        console.debug("EventSource.message: ", event)
        observer.next(event.data)
      });
      es.addEventListener("error", (event) => {
        console.error("EventSource.error: ", event)
        observer.error(event)
        es.close()
      });
    })
  }

}
