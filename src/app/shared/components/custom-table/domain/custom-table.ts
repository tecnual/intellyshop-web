export interface Options {
  title?: string;
}

export class CustomTable<T> {
  data: T[]
  options?: Options;
  rowOptions?: Options;

  constructor(data: T[]) {
    this.data = data;
  }
}
