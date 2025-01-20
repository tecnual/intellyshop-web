import { User } from "@app/core/auth/user.model";

export class Item {
  _id?: string;
  name?: string;
  altNames?: string[];
  description?: string;
  price?: number;
  barcode?: string;
  openFoodFactsProduct?: any;
  prices?: Price[];
  lastPriceUpdateDate?: Date;
  productQuantity?: number;
  productQuantityUnit?: number;

  constructor(name: string, altNames: string[], barcode: string, description?: string, price?: number) {
    this.name = name || undefined;
    this.altNames = altNames || undefined;
    this.barcode = barcode || undefined;
    this.description = description || undefined;
    this.price = price || undefined;
  }
}

export class Price {
  price: number;
  date: Date;
  source: Source;
  createdBy: string;
  currency: string;
  openFoodFactsPrice: any;
  invoice_id: string;
  createdOn: Date;

  constructor(price: number, user: string, source, currency, date, openFoodFactsPrice?: any, invoiceId?) {
    this.price = price;
    this.createdBy = user ;
    this.source = source;
    this.currency = currency;
    this.date = date;
    if (source === Source.OPEN_FOOD_FACTS && openFoodFactsPrice) {
      this.openFoodFactsPrice = openFoodFactsPrice;
      this.date = openFoodFactsPrice.date;
    }
    if (invoiceId) this.invoice_id = invoiceId;
    this.createdOn = new Date();
  }
}

export enum Source {
  SYSTEM = 'System',
  OPEN_FOOD_FACTS = 'OpenFoodFacts',
  USER = 'User',
  INVOICE = 'Invoice'
}
