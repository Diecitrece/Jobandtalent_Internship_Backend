import NotifierPort from '../core/aplication/ports/output/notifier.port';
import User from '../core/domain/user';

const consoleNotifier = (): NotifierPort => {
  const notify = async (user: User, message: string) => {
    console.log(message + ' ' + user.email);
  };
  return { notify };
};

export default consoleNotifier;
