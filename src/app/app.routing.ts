/* Router libraries */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    { path: 'menu', component: MenuComponent},
//    { path: 'pbaseseleccion', component: PbaseseleccionComponent},
    // { path: 'preciobase', component: PrecioBaseComponent}, Comentado por Eurico Cruz, 6/3
    { path: 'preco-base', component: PrecioBaseComponent}, 
    // { path: 'precioventa', component: PrecioVentaComponent}, Comentado por Eurico Cruz, 6/3
    { path: 'preco-venda', component: PrecioVentaComponent},
    // { path: 'sacceso', component: SaccesoComponent}, Comentado por Eurico Cruz, 6/3
    { path: 'acesso', component: SaccesoComponent},
    // { path: 'condicion', component: CondicionComponent}, Comentado por Eurico Cruz, 6/3
    { path: 'condicao', component: CondicionComponent},
    { path: 'plano-compra', component: PlanoCompraComponent},
    { path: 'simulador', component: SimuladorComponent},
    { path: 'execucao', component: ExecucaoComponent},

    { path: 'b-preciobase', component: PrecioBaseBusinessComponent},
    { path: 'b-precioventa', component: PrecioVentaComponent},
    { path: 'diretriz-estrategica', component: DiretrizEstrategicaComponent},
    { path: 'dados-mestre', component: DadosMestreComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: ErrorComponent},

]

/* Export router module */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
