import { Routes } from '@angular/router';

import authGuard from '@guards/auth.guard';
import { BookDetail } from '@services/book.service';

export const appRoutes: Routes = [
  {
    path: '',
    canMatch: [authGuard],
    loadComponent: () => import('@pages/pages.component').then(m => m.PagesComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/admin/books/books.component').then(m => m.BooksComponent),
      },
      {
        path: 'books/add',
        loadComponent: () => import('@pages/admin/books/form/form.component').then(m => m.FormComponent),
      },
      {
        path: 'books/edit/:bookId',
        loadComponent: () => import('@pages/admin/books/form/form.component').then(m => m.FormComponent),
        resolve: {
          bookDetail: BookDetail
        },
      },
      {
        path: 'books/view/:bookId',
        loadComponent: () => import('@pages/admin/books/view/view.component').then(m => m.ViewComponent),
        resolve: {
          bookDetail: BookDetail
        },
      }
    ]
  }
];
