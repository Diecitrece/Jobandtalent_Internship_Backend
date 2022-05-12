import { createContainer, asValue } from "awilix";
import { userRepositoryPostgres } from "../user/user.postgres";
import { consoleNotifier } from "../notifier/console.notifier";
import { generateId } from "../shared/uuid";
import { emailNotifier } from "../notifier/email.notifier";
import { passwordCrypt } from "../shared/password_crypt";
import { companyCases } from "../../core/application/use-cases/company/company.use-cases";
import { userCases } from "../../core/application/use-cases/user/user.use-cases";
import { companyRepositoryPostgres } from "../company/company.postgres";

export const dependenciesContainer = createContainer();

dependenciesContainer.register({
  userRepository: asValue(userRepositoryPostgres),
  consoleNotifier: asValue(consoleNotifier),
  generateId: asValue(generateId),
  emailNotifier: asValue(emailNotifier),
  passwordCrypt: asValue(passwordCrypt),
  userCases: asValue(userCases),
  companyCases: asValue(companyCases),
  companyRepository: asValue(companyRepositoryPostgres),
});
