import { Company } from '../../../domain/company.model';

export type CompanyCreation = Omit<Company, 'id'>;

export interface CompanyCRUD {
  create: (item: CompanyCreation) => Promise<Company | undefined>;
  getAll: () => Promise<Company[]>;
  getOne: (id: string) => Promise<Company | undefined>;
}
