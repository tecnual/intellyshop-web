import { FireflySettings } from "../user.model";

export abstract class UserRest {
  id?: string;
  username?: string;
  //password?: string;
  name?: string;
  lastName?: string;
  lang?: string;
  token?: string;
  email?: string;
  firefly?: FireflySettings;
}

export class UserRequest extends UserRest {
  constructor(username?: string, name?: string, email?: string, lang?: string, firefly?: FireflySettings) {
    super();
    if (username) this.username = username;
    if (name) this.name = name;
    if (email) this.email = email;
    if (lang) this.lang = lang;
    if (firefly) this.firefly = firefly;

  }
}

export class UserResponse extends UserRest {
  _id?: string;
}

export class AddUserForm extends UserRest {
  language?: { code: string, description: string };
  constructor(username?: string, name?: string, email?: string, language?: { code: string, description: string }) {
    super();
    if (username) this.username = username;
    if (name) this.name = name;
    if (email) this.email = email;
    if (language) this.language = language;
  }
}
