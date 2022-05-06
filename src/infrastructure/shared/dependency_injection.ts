import { createContainer, asFunction } from "awilix";

import { userRepositoryPostgres } from "../user/user.postgres";
import { consoleNotifier } from "../notifier/console.notifier";
import { generateId } from "../shared/uuid";
import { emailNotifier } from "../notifier/email.notifier";
import { passwordCrypt } from "../shared/password_crypt";

export const dependenciesContainer = createContainer();

dependenciesContainer.register({
  userRepository: asFunction(userRepositoryPostgres),
  consoleNotifier: asFunction(consoleNotifier),
  generateId: asFunction(generateId),
  emailNotifier: asFunction(emailNotifier),
  passwordCrypt: asFunction(passwordCrypt),
});
