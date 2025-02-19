import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'ruta-inicial',
    loadChildren: () => import('./onboarding/ruta-inicial/ruta-inicial.module').then( m => m.RutaInicialPageModule)
  },
  {
    path: 'menu-admin',
    loadChildren: () => import('./admin/menu-admin/menu-admin.module').then( m => m.MenuAdminPageModule)
  },
  {
    path: 'pages-admin',
    loadChildren: () => import('./admin/pages-admin/pages-admin.module').then( m => m.PagesAdminPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
