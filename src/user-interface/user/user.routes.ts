import { Request, Response, Router, RequestHandler } from "express";
import { UserCases } from "../../core/application/use-cases/user/user.use-cases";
import { schemaUserRegister } from "./validate-body";
import { UserCreation } from "../../core/application/ports/input/userCRUD.port";
import bodyParser from "body-parser";

export const userRouter = Router();
userRouter.use(bodyParser.json());
userRouter.get("/api/users", async (req: Request, res: Response) => {
  const users = await UserCases().getAll();
  res.status(200).json(users);
});
userRouter.get("/api/users/:id", async (req: Request, res: Response) => {
  if (typeof req.query.id === "string") {
    const id: string = req.query.id;
    const user = await UserCases().getOne(id);
    if (user) {
      res.status(200).json(user);
    }
    res.status(404).send("User not found");
  }
  res.status(406).send("Invalid ID");
});
userRouter.post("/api/users", async (req: Request, res: Response) => {
  const body: UserCreation = req.body;
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
