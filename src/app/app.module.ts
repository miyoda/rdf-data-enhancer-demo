import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RdfViewerComponent } from './components/rdf-viewer/rdf-viewer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { RdfTermViewerComponent } from './components/rdf-term-viewer/rdf-term-viewer.component';
import { RdfQuadDetailsViewerComponent } from './components/rdf-quad-details-viewer/rdf-quad-details-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    RdfViewerComponent,
    RdfTermViewerComponent,
    RdfQuadDetailsViewerComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
