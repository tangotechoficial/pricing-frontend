/* Router libraries */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';

/* Routes Array */
const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'menu', component: MenuComponent},
    { path: '**', component: ErrorComponent}
]

/* Export router module */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
