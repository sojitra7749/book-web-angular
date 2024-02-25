import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { API } from '@constants/api.constant';
import { Book, BookList, BookListQueryParams, CreateBook } from '@interfaces/book.model';
import { BaseService } from '@services/base.service';

export const BookDetail: ResolveFn<Observable<CreateBook | unknown>> =
  (route: ActivatedRouteSnapshot) => {
    const bookService = inject(BookService);
    return bookService.getById(route.params.bookId);
  };

@Injectable({
  providedIn: 'root'
})
export class BookService extends BaseService<Book, BookList, BookListQueryParams> {

  getEndPoint(): string {
    return API.BOOKS;
  }
}
