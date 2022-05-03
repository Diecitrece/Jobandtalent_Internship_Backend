import knex from "knex";
import { Respository } from "../../core/application/ports/output/repository.port";
import { User } from "../../core/domain/user.model";
import configs from "../shared/database/knexfile";

const db = knex(configs.development);
export const userRepositoryPostgres = (): Respository<User> => {
  const getAll = async (): Promise<User[]> => {
    const users = await db("users").select("*");
    return users as User[];
  };

  const create = async (user: User): Promise<User | undefined> => {
    const userExist = await db("users").where("email", user.email);
    if (userExist.length > 0) {
      return undefined;
    }
    const userCreated: User = await db("users").insert(user, ["*"]);
    return userCreated;
  };

  const getOne = async (id: string): Promise<User | undefined> => {
    const gotUser: User = await db("users")
      .select("*")
      .where({ id: id })
      .first();
    return gotUser || undefined;
  };
  const getOneByEmail = async (email: string): Promise<User | undefined> => {
    const gotUser: User = await db("users")
      .select("*")
      .where({ email: email })
      .first();
    return gotUser || undefined;
  };
  return { getAll, create, getOne, getOneByEmail };
};
