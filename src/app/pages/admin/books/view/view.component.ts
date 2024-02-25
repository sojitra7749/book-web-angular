import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { ConfirmComponent } from '@components/confirm/confirm.component';
import { DcDirective } from '@directives/dc.directive';
import { Book } from '@interfaces/book.model';
import { ApiResponse } from '@interfaces/common.model';
import { Nl2brPipe } from '@pipes/nl2br.pipe';
import { BookService } from '@services/book.service';
import { DialogService } from '@services/dialog.service';
import { ToasterService } from '@services/toaster.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CurrencyPipe, Nl2brPipe, DcDirective],
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
  @ViewChild(DcDirective, { static: true }) dcContainer!: DcDirective;
  @Input() bookDetail!: ApiResponse<Book>;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private bookService: BookService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.dialogService.confirm$.pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe((isYes) => isYes && this.confirmDelete());
  }

  edit() {
    this.router.navigate(['/books/edit', this.bookDetail.data._id]);
  }

  delete() {
    this.dialogService.open(ConfirmComponent, {
      dcContainer: this.dcContainer,
      data: null
    });
  }

  confirmDelete() {
    this.bookService.delete(this.bookDetail.data._id).subscribe((res) => {
      this.toasterService.showToast(res.message);
      this.dialogService.close();
      this.back();
    });
  }

  back() {
    this.router.navigate(['/']);
  }
}
