import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PbaseComponent } from './components/pbase/pbase.component';
import { SaccesoComponent } from './components/sacceso/sacceso.component';
import { PventaComponent } from './components/pventa/pventa.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { CondicionComponent } from './components/condicion/condicion.component';
import { PbaseseleccionComponent } from './components/pbase/pbaseseleccion/pbaseseleccion.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ErrorComponent,
    LoginComponent,
    PbaseComponent,
    SaccesoComponent,
    PventaComponent,
    NavegacionComponent,
    CondicionComponent,
    PbaseseleccionComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent, appRoutingProviders]
})
export class AppModule { }
