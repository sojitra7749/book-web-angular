import { NgClass, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { STORAGE } from '@constants/storage.constant';
import { ILogin } from '@interfaces/login.interface';
import { AuthService } from '@services/auth.service';
import { CryptoService } from '@services/crypto.service';
import { ToasterService } from '@services/toaster.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [NgIf, NgClass, FormsModule]
})
export class LoginComponent {
  @ViewChild('frm') frm!: NgForm;
  loginForm: ILogin = {
    email: "test@test.com",
    password: "Admin@123"
  };
  isLoading = false;

  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  login() {
    if (this.frm.invalid) { return; }

    this.isLoading = true;
    this.authService.login(this.loginForm.email, this.loginForm.password)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((res) => {
        this.cryptoService.setEncryptedStorage(STORAGE.LOGIN_TOKEN, res.data.token);
        this.cryptoService.setEncryptedStorage(STORAGE.USER_DATA, res.data.user);
        this.router.navigate(['/']).then(() => {
          this.toasterService.showToast(res.message);
        });
      });
  }
}
