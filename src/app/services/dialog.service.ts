import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';
import { DcDirective } from '@app/directives/dc.directive';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  vc!: ViewContainerRef;
  confirm$ = new Subject<boolean>();
  isLoading = false;

  confirmUserDecision(confirm: boolean): void {
    this.confirm$.next(confirm);
  }

  open(component: Type<unknown>, option: { dcContainer: DcDirective; data: unknown }) {
    this.vc = option.dcContainer.viewContainerRef;
    this.vc.clear();

    const componentRef = this.vc.createComponent(component);
    (componentRef as ComponentRef<{ data: unknown }>).instance.data =
      option.data;
  }

  close() {
    this.vc?.clear();
  }
}
