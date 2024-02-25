import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<object>,
    @Inject('STORAGE') private storage: Storage,
  ) { }

  get(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.storage.getItem(key);
    }
    return null;
  }

  set(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.setItem(key, value);
    }
  }

  remove(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.removeItem(key);
    }
  }

  clear() {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.clear();
    }
  }
}
