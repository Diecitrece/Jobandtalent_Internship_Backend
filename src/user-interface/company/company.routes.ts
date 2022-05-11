import { Request, Response, Router } from "express";
import bodyParser from "body-parser";

export const companyRouter = Router();
companyRouter.use(bodyParser.json());
companyRouter.post(
  "/api/companies/",
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).send("panceta");
  }
);
companyRouter.get(
  "/api/companies/",
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).send("panceta");
  }
);
