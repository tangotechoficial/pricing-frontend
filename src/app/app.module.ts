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
import { PrecioTechnical } from './components/precio/precio-technical/precio-technical.component';
import { PrecioBusiness } from './components/precio/precio-business/precio-business.component';
import { SaccesoComponent } from './components/sacceso/sacceso.component';
import { CondicionComponent } from './components/condicion/condicion.component';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { FilterPipeSeqAcceso } from './pipes/filterseqacceso.pipe';
import { FilterPipeSeqSearch } from './pipes/filterseqsearch';
import { FilterPipeSeleccionadoAcceso } from './pipes/filterseleccionado.pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BusinessMenuComponent } from './components/navegacion/business-menu/business-menu.component';
import { TechnicalMenuComponent } from './components/navegacion/technical-menu/technical-menu.component';
import { DadosMestreComponent } from './components/dados-mestre/dados-mestre.component';
import { DiretrizEstrategicaComponent } from './components/diretriz-estrategica/diretriz-estrategica.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PopupmenuComponent } from './components/popupmenu/popupmenu.component';
import { SelectCondicionComponent } from './components/select-condicion/select-condicion.component';
import { SelectPopupCondicionComponent } from './components/select-popup-condicion/select-popup-condicion.component';
import { SelectPopupMaterialComponent } from './components/select-popup-material/select-popup-material.component';
import { SelectPopupExpedicaoComponent } from './components/select-popup-expedicao/select-popup-expedicao.component';
import { SelectPopupFaturamentoComponent } from './components/select-popup-faturamento/select-popup-faturamento.component';
import { SelectPopupRegiaoComponent } from './components/select-popup-regiao/select-popup-regiao.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ErrorComponent,
    LoginComponent,
    NavegacionComponent,
    PrecioBaseComponent,
    PrecioVentaComponent,
    PrecioTechnical,
    PrecioBusiness,
    SaccesoComponent,
    CondicionComponent,
    AutocompleteInputComponent,
    FilterPipeSeqAcceso,
    FilterPipeSeqSearch,
    FilterPipeSeleccionadoAcceso,
    BusinessMenuComponent,
    TechnicalMenuComponent,
    DadosMestreComponent,
    DiretrizEstrategicaComponent,
    PopupmenuComponent,
    SelectCondicionComponent,
    SelectPopupCondicionComponent,
    SelectPopupMaterialComponent,
    SelectPopupExpedicaoComponent,
    SelectPopupFaturamentoComponent,
    SelectPopupRegiaoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    FontAwesomeModule,
    AutocompleteLibModule ,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
