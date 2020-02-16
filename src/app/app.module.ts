import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PrecioBaseComponent } from './components/precio/preciobase/preciobase.component';
import { PrecioVentaComponent } from './components/precio/precioventa/precioventa.component';
import { PrecioSeleccion } from './components/precio/precioseleccion/precioseleccion.component';
import { PrecioElement } from './components/precio/precioelement/precioelement.component';
import { SaccesoComponent } from './components/sacceso/sacceso.component';
import { CondicionComponent } from './components/condicion/condicion.component';
import { PrecioBaseBusinessComponent } from './components/precio/preciobase/business/preciobase.component';

import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { FilterPipeSeqAcceso } from './pipes/filterseqacceso.pipe';
import { FilterPipeSeleccionadoAcceso } from './pipes/filterseleccionado.pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BusinessMenuComponent } from './components/navegacion/business-menu/business-menu.component';
import { TechnicalMenuComponent } from './components/navegacion/technical-menu/technical-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ErrorComponent,
    LoginComponent,
    NavegacionComponent,
    PrecioBaseComponent,
    PrecioVentaComponent,
    PrecioSeleccion,
    PrecioElement,
    SaccesoComponent,
    CondicionComponent,
    PrecioBaseBusinessComponent,
    AutocompleteInputComponent,
    FilterPipeSeqAcceso,
    FilterPipeSeleccionadoAcceso,
    BusinessMenuComponent,
    TechnicalMenuComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    FontAwesomeModule,
    AutocompleteLibModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
