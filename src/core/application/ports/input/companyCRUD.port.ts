import { Company } from '../../../domain/company.model';
import { CRUD } from './CRUD.port';

export type CompanyCreation = Omit<Company, 'id'>;

export type CompanyCRUD = CRUD<Company, CompanyCreation>;
