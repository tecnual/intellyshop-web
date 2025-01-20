export class Invoice {
  _id: number;
  number: string;
  lines: InvoiceLine[];
  currency: string;
  total: number;
  date: Date;
  list_id;
  user_id;

  constructor(number, lines, currency, total, date, list_id, user_id) {
    this.number = number;
    this.lines = lines;
    this.currency = currency;
    this.total = total;
    this.date = date;
    this.list_id = list_id;
    this.user_id = user_id;
  }
}

export class InvoiceLine {
  _id: string;
  barcode: string;
  noBarcode: boolean;
  quantity: number;
  productQuantity: number;
  productQuantityUnit: UnitType;
  description: string;
  price: number;
  unitType: UnitType;
  discount?: string;
  item_id?;
}

export enum UnitType {
  UNIT = 'u',
  KG = 'Kg',
  G = 'g',
  L = 'L',
  PACK = 'Pack'
}
