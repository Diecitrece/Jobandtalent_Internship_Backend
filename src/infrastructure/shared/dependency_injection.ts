import { createContainer, asFunction } from "awilix";
import { User } from "../../core/domain/user.model";
import { userRepositoryPostgres } from "../user/user.postgres";
import { consoleNotifier } from "../notifier/console.notifier";
import { generateId } from "../shared/uuid";
import { emailNotifier } from "../notifier/email.notifier";
import { passwordCrypt } from "../shared/password_crypt";
import { userCases } from "../../core/application/use-cases/user/user.use-cases";
import { UserRepository } from "../../core/application/ports/output/repository.port";
import { NotifierPort } from "../../core/application/ports/output/notifier.port";
import { PasswordCrypt } from "../../core/application/ports/output/password_crypt.port";
import { UserCRUD } from "../../core/application/ports/input/userCRUD.port";

const dependenciesContainer = createContainer();

dependenciesContainer.register({
  userRepository: asFunction(userRepositoryPostgres),
  consoleNotifier: asFunction(consoleNotifier),
  generateId: asFunction(generateId),
  emailNotifier: asFunction(emailNotifier),
  passwordCrypt: asFunction(passwordCrypt),
  userCases: asFunction(userCases),
});

export const userRepositoryDep: UserRepository<User> =
  dependenciesContainer.resolve("userRepository");
export const consoleNotifierDep: NotifierPort =
  dependenciesContainer.resolve("consoleNotifier");
export const generateIdDep: string =
  dependenciesContainer.resolve("generateId");
export const emailNotifierDep: NotifierPort =
  dependenciesContainer.resolve("emailNotifier");
export const passwordCryptDep: PasswordCrypt =
  dependenciesContainer.resolve("passwordCrypt");
export const userCasesDep: UserCRUD =
  dependenciesContainer.resolve("userCases");
