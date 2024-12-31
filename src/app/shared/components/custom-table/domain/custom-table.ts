export interface Options {
  title?: string;
}

export class CustomTable<T> {
  data: T[];
  columns: CustomTableColumn[];
  options?: Options;
  rowOptions?: Options;

  constructor(data: T[]) {
    this.data = data;
  }
}

export interface CustomTableColumn {
  name: string;
  label: string;
  type: CustomTableColumnType;
  class?: string;
  options?: Options;
}

export enum CustomTableColumnType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
  CURRENCY = 'currency',
  BOOLEAN = 'boolean',
  OBJECT = 'object'
}
