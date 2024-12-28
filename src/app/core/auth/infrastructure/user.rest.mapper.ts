import { AddUserForm, UserRequest, UserResponse } from "./user.rest.dto";
import { FireflySettings, User } from "../user.model";

export class UserMapper {
  domainToRequest(user: AddUserForm): UserRequest {
    const userRequest = new UserRequest(user.username, user.name, user.email, user.language.code );
    return userRequest;
  }

  responseToDomain(user: UserResponse): User {
    const userDomain = new User(user.username, undefined, user.name, user.email, user.lang, user.firefly);
    userDomain.id = user._id;
    return userDomain;
  }

  updateUserFormToRequest(user: User, fireflySettings: FireflySettings): UserRequest {
    const userRequest = new UserRequest(user?.username, user?.name, user?.email, user?.lang, fireflySettings);
    return userRequest;
  }
}
