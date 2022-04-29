import { NotifierPort } from "../../core/application/ports/output/notifier.port";
import { User } from "../../core/domain/user.model";

export const consoleNotifier = (): NotifierPort => {
  const notify = async (user: User, message: string) => {
    console.log(`${message} ${user.firstName}`);
  };
  return { notify };
};
