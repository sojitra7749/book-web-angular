import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  notWhitespace(control: AbstractControl): ValidationErrors | null {
    return control.value && String(control.value).trim().length === 0
      ? { required: true }
      : null;
  }
}
