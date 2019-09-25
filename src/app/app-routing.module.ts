import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppGuard } from './app.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', canActivate: [AppGuard], loadChildren: './auth/auth.module#AuthModule' },
  { path: 'articles', canActivate: [AppGuard], loadChildren: './articles/articles.module#ArticlesModule' },
  { path: 'new', canActivate: [AppGuard], loadChildren: './edit-article/edit-article.module#EditArticleModule' },
  { path: 'edit/:id', canActivate: [AppGuard], loadChildren: './edit-article/edit-article.module#EditArticleModule' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
