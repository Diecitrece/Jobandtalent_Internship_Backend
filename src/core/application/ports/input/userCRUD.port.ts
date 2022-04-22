import { Body } from "../../../../user-interface/user/body.model";
import { User } from "../../../domain/user.model";
export interface UserCRUD {
  create: (item: Body) => Promise<Body | undefined>;
  getAll: () => Promise<Body[] | []>;
  getOne: (id: string) => Promise<User | undefined>;
}
