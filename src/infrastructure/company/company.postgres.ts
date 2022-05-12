import knex from "knex";
import { Repository } from "../../core/application/ports/output/repository.port";
import { Company } from "../../core/domain/company.model";
import configs from "../shared/database/knexfile";

const db =
  process.env.NODE_ENV === "test"
    ? knex(configs.test)
    : knex(configs.development);

export const companyRepositoryPostgres = (): Repository<Company> => {
  const create = async (company: Company): Promise<Company | undefined> => {
    const companyCreated: Company = (
      await db("companies").insert(company, ["*"])
    )[0];
    return companyCreated;
  };
  const getAll = async (): Promise<Company[]> => {
    const companies = await db("companies").select("*");
    return companies as Company[];
  };
  const getOne = async (id: string): Promise<Company | undefined> => {
    const gotCompany: Company = await db("companies")
      .select("*")
      .where({ id: id })
      .first();
    return gotCompany || undefined;
  };
  return { create, getAll, getOne };
};
