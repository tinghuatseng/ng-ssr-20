import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { News } from './news/news';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        component: Landing
    },
    {
        path: 'news',
        loadComponent: ()=> import('./news/news').then(m => m.News)
    },
    {
        path: 'blog',
        loadComponent: ()=> import('./blog/blog').then(m => m.Blog)
    },
    {
        path: 'blog/:id',
        loadComponent: ()=> import('./blog-detail/blog-detail').then(m => m.BlogDetail)
    },
    {
        path: 'login',
        loadComponent: ()=> import('./login/login').then(m => m.Login)
    },
    {
      path: '**',
      component: Landing // Fallback to Landing for any unknown routes
    }
];
