import knex from "knex";
import { Respository } from "../../core/application/ports/output/repository.port";
import { User } from "../../core/domain/user.model";
import configs from "../shared/database/knexfile";

console.log(configs.development);
const db = knex(configs.development);
export const userRepositoryPostgres = (): Respository<User> => {
  const getAll = async () => {
    const users = await db("users").select("*");
    return users as User[];
  };

  const create = async (user: User) => {
    const userExist = await db("users").where("email", user.email);
    if (userExist.length > 0) {
      return undefined;
    }
    const userCreated: User = await db("users").insert(user, ["*"]);
    console.log("Returned: " + userCreated);
    return userCreated;
  };

  const getOne = async (id: string) => {
    const gotUser: User = await db("users")
      .select("*")
      .where({ id: id })
      .first();
    return gotUser ? gotUser : undefined;
  };
  return { getAll, create, getOne };
};
