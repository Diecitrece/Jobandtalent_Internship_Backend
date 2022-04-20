import User from '@domain/user';

interface NotifierPort {
  notify: (user: User, message: string) => Promise<void>;
}

export default NotifierPort;
