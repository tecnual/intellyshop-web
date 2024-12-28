export class User {
  _id?: string;
  id?: string;
  username: string;
  password?: string;
  name: string;
  lastName?: string;
  lang: string;
  token?: string;
  email: string;
  firefly?: FireflySettings;

  constructor(username?, password?, name?, email?, lang?, firefly?) {
    this.username = username!;
    if(password) this.password = password;
    this.name = name!;
    this.email = email!;
    this.lang = lang!;
    if(firefly) this.firefly = firefly;
  }
}

export class FireflySettings {
  token: string;
  defaultSourceAccount: EntityReference;
  defaultDestinationAccount: EntityReference;
  defaultBudget: EntityReference;
  defaultCategory: EntityReference;
  accounts: Account[]

  constructor(token: string,
    defaultSourceAccount: EntityReference,
    defaultDestinationAccount: EntityReference,
    defaultBudget: EntityReference,
    defaultCategory: EntityReference,
    accounts: Account[]) {
    if (token) this.token = token;
    if (defaultSourceAccount) this.defaultSourceAccount = defaultSourceAccount;
    if (defaultDestinationAccount) this.defaultDestinationAccount = defaultDestinationAccount;
    if (defaultBudget) this.defaultBudget = defaultBudget;
    if (defaultCategory) this.defaultCategory = defaultCategory;
    if (accounts) this.accounts = accounts;
  }
}

export interface EntityReference {
  id: string;
  name: string;
}

export class Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  active: boolean;
}
