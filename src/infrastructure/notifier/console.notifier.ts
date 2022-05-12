import { NotifierPort } from '@ports/output/notifier.port';
import { User } from '@domain/user.model';

export const consoleNotifier = (): NotifierPort => {
  const notify = async (user: User, message: string): Promise<void> => {
    console.log(`${message} ${user.firstName}`);
  };
  return { notify };
};
