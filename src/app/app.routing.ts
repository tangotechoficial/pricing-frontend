/* Router libraries */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthenticationGuard} from '@helpers/auth.guard';

/* Components */
import { MenuComponent } from '@app/components/menu/menu.component';
import { LoginComponent } from '@app/components/login/login.component';
import { ErrorComponent } from '@app/components/error/error.component';
import { PrecioBaseComponent } from '@app/components/precio/preciobase/preciobase.component';
import { SaccesoComponent } from '@app/components/sacceso/sacceso.component';
import { CondicionComponent } from '@app/components/condicion/condicion.component';
import { DadosMestreComponent } from '@app/components/dados-mestre/dados-mestre.component';
import { DiretrizEstrategicaComponent } from '@app/components/diretriz-estrategica/diretriz-estrategica.component';
import { SelectCondicionComponent } from '@app/components/select-condicion/select-condicion.component';
import { PlanoCompraComponent } from '@app/components/plano-compra/plano-compra.component';
import { ExecucaoComponent } from '@app/components/execucao/execucao.component';
import { SimuladorComponent } from '@app/components/simulador/simulador.component';
import { RegisterComponent } from '@app/components/register/register.component';
/* Routes Array */
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuComponent, canActivate: [AuthenticationGuard]},
//    { path: 'pbaseseleccion', component: PbaseseleccionComponent},
    { path: 'preciobase', component: PrecioBaseComponent, canActivate: [AuthenticationGuard]},
    { path: 'precioventa', component: PrecioBaseComponent, canActivate: [AuthenticationGuard]},
    { path: 'sacceso', component: SaccesoComponent, canActivate: [AuthenticationGuard]},
    { path: 'selectcondicao', component: SelectCondicionComponent},
    { path: 'condicion/:param', component: CondicionComponent, runGuardsAndResolvers: 'always'},
    { path: 'datalab/plano-compras', component: PlanoCompraComponent,  canActivate: [AuthenticationGuard]},
    { path: 'datalab/simulador', component: SimuladorComponent,  canActivate: [AuthenticationGuard]},
    { path: 'datalab/execucao', component: ExecucaoComponent,  canActivate: [AuthenticationGuard]},
    { path: 'datalab/diretriz-estrategica', component: DiretrizEstrategicaComponent,  canActivate: [AuthenticationGuard]},
    { path: 'datalab/dados-mestre', component: DadosMestreComponent,  canActivate: [AuthenticationGuard]},
    { path: 'register', component: RegisterComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: ErrorComponent},

];

/* Export router module */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload'});
