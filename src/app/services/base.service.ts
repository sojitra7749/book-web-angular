import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/interfaces/common.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T, U, V> {
  abstract getEndPoint(): string;

  constructor(private http: HttpClient) { }

  get(params?: Partial<V>) {
    const httpParams = this.createHttpParamsFromPartial(params);
    return this.http.get<ApiResponse<U>>(this.getEndPoint(), { params: httpParams });
  }

  getById(uuid: string) {
    return this.http.get<ApiResponse<T>>(`${this.getEndPoint()}/${uuid}`);
  }

  create(data: Partial<T>) {
    return this.http.post<ApiResponse<T>>(`${this.getEndPoint()}`, data);
  }

  update(uuid: string, data: Partial<T>) {
    return this.http.patch<ApiResponse<T>>(`${this.getEndPoint()}/${uuid}`, data);
  }

  delete(uuid: string) {
    return this.http.delete<ApiResponse<null>>(`${this.getEndPoint()}/${uuid}`);
  }

  private createHttpParamsFromPartial(partial?: Partial<V>): HttpParams {
    let httpParams = new HttpParams();
    for (const key in partial) {
      if (Object.hasOwn(partial, key)) {
        httpParams = httpParams.set(key, String(partial[key]));
      }
    }
    return httpParams;
  }
}
