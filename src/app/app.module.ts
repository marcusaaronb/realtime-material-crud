import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// angularfire2
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './../environments/environment.prod';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firestoreConfig),
    AngularFirestoreModule.enablePersistence(),
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
