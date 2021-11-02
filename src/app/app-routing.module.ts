import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then( m => m.AccountsPageModule)
  },
  {
    path: 'account-detail',
    loadChildren: () => import('./account-detail/account-detail.module').then( m => m.AccountDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
