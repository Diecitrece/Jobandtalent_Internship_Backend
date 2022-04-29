import { Request, Response, Router } from "express";
import { UserCases } from "../../core/application/use-cases/user/user.use-cases";
import { schemaUserLogin, schemaUserRegister } from "./validate-body";
import {
  UserCreation,
  UserVerify,
} from "../../core/application/ports/input/userCRUD.port";
import bodyParser from "body-parser";
import { tokenCreator } from "../../infrastructure/user/jwt/generateToken";

export const userRouter = Router();
userRouter.use(bodyParser.json());
userRouter.get(
  "/api/users",
  async (req: Request, res: Response): Promise<void> => {
    const users = await UserCases().getAll();
    res.status(200).json(users);
    return;
  }
);
userRouter.get(
  "/api/users/:id",
  async (req: Request, res: Response): Promise<void> => {
    if (typeof req.query.id !== "string") {
      res.status(406).send("Invalid ID");
      return;
    }
    const id: string = req.query.id;
    const user = await UserCases().getOne(id);
    if (user) {
      res.status(200).json(user);
      return;
    }
    res.status(404).send("User not found");
    return;
  }
);
userRouter.post(
  "/api/users",
  async (req: Request, res: Response): Promise<void> => {
    const validation = schemaUserRegister.validate(req.body);
    if (validation.error) {
      res.status(418).send(validation.error?.details);
      return;
    }
    const body: UserCreation = req.body;
    const newUser = await UserCases().create(body);
    if (newUser) {
      res.status(200).json(newUser);
      return;
    }
    res.status(400).send("User already exists");
    return;
  }
);

userRouter.post(
  "/api/users/login",
  async (req: Request, res: Response): Promise<void> => {
    const validation = schemaUserLogin.validate(req.body);
    if (validation.error) {
      res.status(418).send(validation.error?.details);
    }
    const body: UserVerify = req.body;
    const exists = await UserCases().login(body);
    if (exists) {
      const token = await tokenCreator().accessToken(body);
      res.status(200).json({ accessToken: token });
      return;
    }
    res.status(400).send("Invalid email or password");
    return;
  }
);
