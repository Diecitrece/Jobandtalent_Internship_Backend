import { Request, Response, Router } from "express";
import { UserCases } from "../../core/application/use-cases/user/user.use-cases";
import { schemaUserRegister } from "./validate-body";
import bodyParser from "body-parser";

export const userRouter = Router();
userRouter.use(bodyParser.json());
userRouter.get("/api/users", async (req: Request, res: Response) => {
  const { id } = req.body;
  if (id) {
    const user = await UserCases().getOne(id);
    res.status(200).json(user);
  }
  if (!id) {
    const users = await UserCases().getAll();
    res.status(200).json(users);
  }
});

userRouter.post("/api/users", async (req: Request, res: Response) => {
  const { body } = req;
  const validation = schemaUserRegister.validate(body);
  if (validation.error) {
    res.status(418).send(validation.error?.details);
  }
  if (!validation.error) {
    const newUser = await UserCases().create(body);
    if (!newUser) {
      res.status(400).send("User already exists");
    }
    res.status(200).json(newUser);
  }
});
