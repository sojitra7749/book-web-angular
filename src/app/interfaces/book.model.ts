import { Entity, EntityList, EntityParams, FormControlMap } from '@interfaces/common.model';

export interface Book extends Entity {
  name: string;
  author: string;
  description: string;
  price: string;
}

export interface CreateBook {
  name: string;
  email: string;
}

export interface BookListQueryParams extends EntityParams {
  userId: string;
  name: string;
  email: string;
}

export type BookList = EntityList<Book>;

export type AddBookForm = FormControlMap<CreateBook>;
