import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse, Login } from '@app/interfaces/common.model';

import { API } from '@constants/api.constant';
import { STORAGE } from '@constants/storage.constant';
import { CryptoService } from '@services/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/auth/login';

  constructor(
    private http: HttpClient,
    private cryptoService: CryptoService,
    private router: Router
  ) { }

  get initials() {
    const user = this.cryptoService.getDecryptedStorage(STORAGE.USER_DATA);

    if (user) {
      const fullName = JSON.parse(JSON.stringify(user)).name;
      const allNames = fullName.trim().split(' ');
      const initials = allNames.reduce((acc: string, curr: string, index: number) => {
        if (index === 0 || index === allNames.length - 1) {
          acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        }
        return acc;
      }, '');
      return initials;
    }
    return '';
  }


  login(email: string, password: string) {
    return this.http.post<ApiResponse<Login>>(API.LOGIN, { email, password });
  }

  public isLoggedIn() {
    return this.cryptoService.getDecryptedStorage(STORAGE.LOGIN_TOKEN);
  }

  public logout() {
    this.router.navigate([this.loginUrl]);
    return this.cryptoService.removeEncryptedStorage(STORAGE.LOGIN_TOKEN);
  }
}
