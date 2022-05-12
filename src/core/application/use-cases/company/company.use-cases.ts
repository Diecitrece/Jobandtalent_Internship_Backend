import { Company } from '../../../../core/domain/company.model';
import {
  CompanyCreation,
  CompanyCRUD,
} from '../../../../core/application/ports/input/companyCRUD.port';
import { CompanyRepository } from '../../../../core/application/ports/output/repository.port';
import { dependenciesContainer } from '../../../../infrastructure/shared/dependency_injection';
export const companyCases = (): CompanyCRUD => {
  const generateId: () => string = dependenciesContainer.cradle.generateId;
  const companyRepository: () => CompanyRepository =
    dependenciesContainer.cradle.companyRepository;

  const create = async (
    data: CompanyCreation
  ): Promise<Company | undefined> => {
    const { name, address, phone, low_range_employees, high_range_employees } =
      data;
    const company: Company = {
      id: generateId(),
      name: name,
      address: address,
      phone: phone,
      low_range_employees: low_range_employees,
      high_range_employees: high_range_employees,
    };
    const newCompany = await companyRepository().create(company);
    return newCompany;
  };
  const getAll = async (): Promise<Company[]> => {
    return companyRepository().getAll();
  };
  const getOne = async (id: string): Promise<Company | undefined> => {
    return companyRepository().getOne(id);
  };
  return { create, getAll, getOne };
};
