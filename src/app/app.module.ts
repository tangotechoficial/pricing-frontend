import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { JWTInterceptorHelper } from '@helpers/jwt.interceptor';
import { FakeDataProviderInterceptor } from '@helpers/fake.dataprovider.interceptor';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PrecioBaseComponent } from './components/precio/preciobase/preciobase.component';
import { PreciobbaseComponent } from './components/precio/preciobbase/preciobbase.component';
import { PreciobvendasComponent } from './components/precio/preciobvendas/preciobvendas.component';
import { PrecioVentaComponent } from './components/precio/precioventa/precioventa.component';
import { PrecioSeleccion } from './components/precio/precioseleccion/precioseleccion.component';
import { PrecioElement } from './components/precio/precioelement/precioelement.component';
import { SaccesoComponent } from './components/sacceso/sacceso.component';
import { CondicionComponent } from './components/condicion/condicion.component';
import { PrecioBaseBusinessComponent } from './components/precio/preciobase/business/preciobase.component';
import { PlanoCompraComponent } from './components/plano-compra/plano-compra.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';
import { SimuladorComponent } from './components/simulador/simulador.component';

import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { FilterPipeSeqAcceso } from './pipes/filterseqacceso.pipe';
import { FilterPipeSeqSearch } from './pipes/filterseqsearch';
import { FilterPipeSeleccionadoAcceso } from './pipes/filterseleccionado.pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BusinessMenuComponent } from './components/navegacion/business-menu/business-menu.component';
import { TechnicalMenuComponent } from './components/navegacion/technical-menu/technical-menu.component';
import { DadosMestreComponent } from './components/dados-mestre/dados-mestre.component'
import { DiretrizEstrategicaComponent } from './components/diretriz-estrategica/diretriz-estrategica.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { TabbedChartsComponent } from './components/plano-compra/tabbed-charts/tabbed-charts.component';
import { SellingCompositionChartsComponent } from './components/plano-compra/selling-composition-charts/selling-composition-charts.component';
import { PlanningTableComponent } from './components/plano-compra/planning-table/planning-table.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ErrorComponent,
    LoginComponent,
    NavegacionComponent,
    PrecioBaseComponent,
    PreciobbaseComponent,
    PreciobvendasComponent,
    PrecioVentaComponent,
    PrecioSeleccion,
    PrecioElement,
    SaccesoComponent,
    CondicionComponent,
    PrecioBaseBusinessComponent,
    AutocompleteInputComponent,
    FilterPipeSeqAcceso,
    FilterPipeSeqSearch,
    FilterPipeSeleccionadoAcceso,
    BusinessMenuComponent,
    TechnicalMenuComponent,
    DadosMestreComponent,
    DiretrizEstrategicaComponent,
    PlanoCompraComponent,
    ExecucaoComponent,
    SimuladorComponent,
    FilterModalComponent,
    TabbedChartsComponent,
    SellingCompositionChartsComponent,
    PlanningTableComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    Ng2SearchPipeModule,
    FontAwesomeModule,
    AutocompleteLibModule ,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: FakeDataProviderInterceptor, multi: true},
    appRoutingProviders,
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorHelper, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
