import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { BookService } from '@app/services/book.service';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { Book } from '@interfaces/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [NgFor, CurrencyPipe, PaginationComponent],
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  currentBook!: Book;
  page = 1;
  pageSize = 10;
  totalBooks = 0;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.get({
      page: this.page,
      pageSize: this.pageSize
    }).subscribe((res) => {
      this.books = res.data.records;
      this.totalBooks = res.data.totalRecords;
    });
  }

  add() {
    this.router.navigate(['/books/add']);
  }

  view(book: Book) {
    this.router.navigate(['/books/view', book._id]);
  }

  onPageChange(page: number) {
    this.page = page;
    this.getBooks();
  }
}
