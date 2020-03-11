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

import { PrecioBaseBusinessComponent } from './components/precio/preciobase/business/preciobase.component';
import { DadosMestreComponent } from './components/dados-mestre/dados-mestre.component';
import { DiretrizEstrategicaComponent } from './components/diretriz-estrategica/diretriz-estrategica.component';
import { PlanoCompraComponent } from './components/plano-compra/plano-compra.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';
import { SimuladorComponent } from './components/simulador/simulador.component';

/* Routes Array */
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuComponent,  canActivate: [AuthenticationGuard]},
//    { path: 'pbaseseleccion', component: PbaseseleccionComponent},
    { path: 'preciobase', component: PrecioBaseComponent,  canActivate: [AuthenticationGuard]},
    { path: 'precioventa', component: PrecioVentaComponent,  canActivate: [AuthenticationGuard]},
    { path: 'sacceso', component: SaccesoComponent,  canActivate: [AuthenticationGuard]},
    { path: 'condicion', component: CondicionComponent,  canActivate: [AuthenticationGuard]},
    { path: 'plano-compra', component: PlanoCompraComponent,  canActivate: [AuthenticationGuard]},
    { path: 'simulador', component: SimuladorComponent,  canActivate: [AuthenticationGuard]},
    { path: 'execucao', component: ExecucaoComponent,  canActivate: [AuthenticationGuard]},

    { path: 'b-preciobase', component: PrecioBaseBusinessComponent,  canActivate: [AuthenticationGuard]},
    { path: 'b-precioventa', component: PrecioVentaComponent,  canActivate: [AuthenticationGuard]},
    { path: 'diretriz-estrategica', component: DiretrizEstrategicaComponent,  canActivate: [AuthenticationGuard]},
    { path: 'dados-mestre', component: DadosMestreComponent,  canActivate: [AuthenticationGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: ErrorComponent},

]

/* Export router module */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
