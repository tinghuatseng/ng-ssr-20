import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client
  },
  {
    path: 'landing',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'news',
    renderMode: RenderMode.Server
  },
  {
    path: 'blog',
    renderMode: RenderMode.Server
  },
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
