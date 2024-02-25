import { FormControl } from '@angular/forms';

export interface ActionToolbar {
  label: string;
  callback: (rowReference: unknown) => void;
}

export interface DialogData {
  name?: string;
  type: string;
}

export interface Entity {
  _id: string;
  name: string;
  created_at: string;
  uuid: string;
  action: ActionToolbar[];
}

export interface EntityList<T> {
  records: T[];
  totalRecords: number;
}

export interface EntityParams {
  sort: string;
  page: number;
  pageSize: number;
  search: string;
}

export type FormControlMap<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export interface TableColumn {
  key: string;
  label: string;
}

export interface Toaster {
  message: string;
  type: 'success' | 'error';
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface Login {
  token: string
  user: User
}

export interface User {
  _id: string
  email: string
  name: string
}
