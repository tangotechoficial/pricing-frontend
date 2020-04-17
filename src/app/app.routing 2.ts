/* Router libraries */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthenticationGuard} from '@helpers/auth.guard';

/* Components */
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { PrecioBaseComponent } from './components/precio/preciobase/preciobase.component';
import { PrecioVentaComponent } from './components/precio/precioventa/precioventa.component';
import { SaccesoComponent } from './components/sacceso/sacceso.component';
import { CondicionComponent } from './components/condicion/condicion.component';

import { DadosMestreComponent } from './components/dados-mestre/dados-mestre.component';
import { DiretrizEstrategicaComponent } from './components/diretriz-estrategica/diretriz-estrategica.component';
import { SelectCondicionComponent } from './components/select-condicion/select-condicion.component';
import { PlanoCompraComponent } from './components/plano-compra/plano-compra.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';
import { SimuladorComponent } from './components/simulador/simulador.component';
/* Routes Array */
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuComponent, canActivate: [AuthenticationGuard]},
//    { path: 'pbaseseleccion', component: PbaseseleccionComponent},
    { path: 'preciobase', component: PrecioBaseComponent, canActivate: [AuthenticationGuard]},
    { path: 'precioventa', component: PrecioBaseComponent, canActivate: [AuthenticationGuard]},

    { path: 'sacceso', component: SaccesoComponent, canActivate: [AuthenticationGuard]},
    { path: 'selectcondicao', component: SelectCondicionComponent, canActivate: [AuthenticationGuard]},
    { path: 'condicion/:param', component: CondicionComponent, runGuardsAndResolvers: 'always'},
    { path: 'plano-compra', component: PlanoCompraComponent,  canActivate: [AuthenticationGuard]},
    // { path: 'simulador', component: SimuladorComponent,  canActivate: [AuthenticationGuard]},
    // { path: 'execucao', component: ExecucaoComponent,  canActivate: [AuthenticationGuard]},
    { path: 'diretriz-estrategica', component: DiretrizEstrategicaComponent,  canActivate: [AuthenticationGuard]},
    { path: 'dados-mestre', component: DadosMestreComponent,  canActivate: [AuthenticationGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: ErrorComponent},

];

/* Export router module */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload'});
