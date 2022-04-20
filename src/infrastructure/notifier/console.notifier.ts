import NotifierPort from '@ports/output/notifier.port';
import User from '@domain/user';

const consoleNotifier = (): NotifierPort => {
  const notify = async (user: User, message: string) => {
    console.log(message + ' ' + user.firstName);
  };
  return { notify };
};

export default consoleNotifier;
