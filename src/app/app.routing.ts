/* Router libraries */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { PbaseComponent } from './components/pbase/pbase.component';
import { SaccesoComponent } from './components/sacceso/sacceso.component';
import { PventaComponent } from './components/pventa/pventa.component';
import { CondicionComponent } from './components/condicion/condicion.component';

/* Routes Array */
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'pbase', component: PbaseComponent},
    { path: 'sacceso', component: SaccesoComponent},
    { path: 'pventa', component: PventaComponent},
    { path: 'condicion', component: CondicionComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', component: ErrorComponent},
]

/* Export router module */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
