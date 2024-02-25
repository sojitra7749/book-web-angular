import { NgClass, NgIf } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '@app/interfaces/book.model';
import { ApiResponse } from '@app/interfaces/common.model';

import { BookService } from '@app/services/book.service';
import { ValidatorService } from '@app/services/validator.service';
import { ToasterService } from '@services/toaster.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule]
})
export class FormComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
  bookFrom!: FormGroup;
  isLoading = false;
  @Input() bookId!: string;
  @Input() bookDetail!: ApiResponse<Book>;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private toasterService: ToasterService,
    private router: Router,
    private validatorService: ValidatorService
  ) { }

  get frm() {
    return this.bookFrom.controls;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookFrom = this.fb.group({
      name: ['', [Validators.required, this.validatorService.notWhitespace]],
      author: ['', [Validators.required, this.validatorService.notWhitespace]],
      description: ['', [Validators.required, this.validatorService.notWhitespace]],
      price: ['', [Validators.required, Validators.pattern("\\d+(\\.\\d{1,2})?")]],
    });
    this.bookDetail && this.bookFrom.patchValue(this.bookDetail.data);
  }

  onSubmit() {
    this.bookFrom.markAllAsTouched();
    if (this.bookFrom.invalid) return;

    if (this.bookId) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.isLoading = true;
    this.bookService.create(this.bookFrom.value).pipe(
      takeUntilDestroyed(this.#destroyRef),
      finalize(() => this.isLoading = false)
    ).subscribe((res) => {
      this.toasterService.showToast(res.message);
      this.back();
    });
  }

  update() {
    this.isLoading = true;
    this.bookService.update(this.bookId, this.bookFrom.value)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        finalize(() => this.isLoading = false)
      ).subscribe((res) => {
        this.toasterService.showToast(res.message);
        this.router.navigate(['/books/view', this.bookId]);
      });
  }

  back() {
    this.router.navigate(['/']);
  }

}
