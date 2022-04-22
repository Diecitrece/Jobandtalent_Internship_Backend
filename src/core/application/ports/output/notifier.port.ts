import { User } from '../../../domain/user';

export interface NotifierPort {
  notify: (user: User, message: string) => Promise<void>;
}
