import { Company } from "@core/domain/company.model";
import {
  CompanyCreation,
  CompanyCRUD,
} from "@core/application/ports/input/companyCRUD.port";
export const companyCases = (): CompanyCRUD => {
  const create = async (
    data: CompanyCreation
  ): Promise<Company | undefined> => {};
  const getAll = async (): Promise<Company[]> => {};
  const getOne = async (id: string): Promise<Company | undefined> => {};
  return { create, getAll, getOne };
};
