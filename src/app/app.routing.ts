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

import { DadosMestreComponent } from './components/dados-mestre/dados-mestre.component';
import { DiretrizEstrategicaComponent } from './components/diretriz-estrategica/diretriz-estrategica.component';
import { PreciobbaseComponent } from './components/precio/preciobbase/preciobbase.component';
import { PreciobvendasComponent } from './components/precio/preciobvendas/preciobvendas.component';
/* Routes Array */
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuComponent},
//    { path: 'pbaseseleccion', component: PbaseseleccionComponent},
    { path: 'preciobase', component: PrecioBaseComponent},
    { path: 'precioventa', component: PrecioVentaComponent},
    { path: 'sacceso', component: SaccesoComponent},
    { path: 'condicion', component: CondicionComponent, runGuardsAndResolvers: 'always'},
    { path: 'b-preciobase', component: PreciobbaseComponent},
    { path: 'b-precioventa', component: PreciobvendasComponent},
    { path: 'diretriz-estrategica', component: DiretrizEstrategicaComponent},
    { path: 'dados-mestre', component: DadosMestreComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: ErrorComponent},

]

/* Export router module */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload'});
