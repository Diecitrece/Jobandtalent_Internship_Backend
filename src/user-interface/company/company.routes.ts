import { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { schemaCompanyCreate } from './validate-body.company';
import { CompanyCreation, CompanyCRUD } from '@ports/input/companyCRUD.port';
import { dependenciesContainer } from '@shared/dependency_injection';
const companyCases: CompanyCRUD = dependenciesContainer.cradle.companyCases();

export const companyRouter = Router();
companyRouter.use(bodyParser.json());
companyRouter.post(
  '/api/admin/companies/',
  async (req: Request, res: Response): Promise<void> => {
    const validation = schemaCompanyCreate.validate(req.body);
    if (validation.error) {
      res.status(400).send(validation.error?.details[0].message);
      return;
    }
    const body: CompanyCreation = req.body;
    const newCompany = await companyCases.create(body);
    if (newCompany) {
      res.status(201).json(newCompany);
      return;
    }
    res.status(400).send('Company already exists');
    return;
  }
);
companyRouter.get(
  '/api/admin/companies/',
  async (req: Request, res: Response): Promise<void> => {
    const companies = await companyCases.getAll();
    res.status(200).json(companies);
    return;
  }
);
companyRouter.get(
  '/api/admin/companies/:id',
  async (req: Request, res: Response): Promise<void> => {
    if (typeof req.params.id !== 'string') {
      res.status(400).send('Invalid ID');
      return;
    }
    const id: string = req.params.id;
    const company = await companyCases.getOne(id);
    if (company) {
      res.status(200).json(company);
      return;
    }
    res.status(404).send('Company not found');
    return;
  }
);
