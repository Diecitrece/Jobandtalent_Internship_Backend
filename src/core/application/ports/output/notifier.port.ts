import { User } from '../../../domain/user.model';

export interface NotifierPort {
  notify: (user: User, message: string) => Promise<void>;
}
