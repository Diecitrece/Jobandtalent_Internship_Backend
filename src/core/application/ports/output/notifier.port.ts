import { User } from '@core/domain/user.model';

export interface NotifierPort {
  notify: (user: User, message: string) => Promise<void>;
}
