import { environment } from "src/environments/environment";

export const API = {
  LOGIN: `${environment.API_URL}/api/v1/auth/login`,
  BOOKS: `${environment.API_URL}/api/v1/books`
};
