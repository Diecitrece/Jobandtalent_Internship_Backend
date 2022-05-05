import { Request, Response, Router } from "express";
import { UserCases } from "../../core/application/use-cases/user/user.use-cases";
import { schemaUserLogin, schemaUserRegister } from "./validate-body";
import {
  UserCreation,
  UserVerify,
} from "../../core/application/ports/input/userCRUD.port";
import bodyParser from "body-parser";
import { tokenManager } from "../../infrastructure/user/jwt/manageToken";
import { authenticateToken } from "./middlewares/authenticateToken";

interface UserReturning {
  id: string;
  firstName: string;
  surNames: string;
  email: string;
  phone: string;
  address: string;
}

export const userRouter = Router();
userRouter.use(bodyParser.json());
userRouter.get(
  "/api/users",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    const users = await UserCases().getAll();
    const usersReturn: UserReturning[] = [];
    users.map((user) => {
      usersReturn.push({
        id: user.id,
        firstName: user.firstName,
        surNames: user.surNames,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    });
    res.status(200).json(usersReturn);
    return;
  }
);
userRouter.get(
  "/api/users/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    if (typeof req.params.id !== "string") {
      res.status(400).send("Invalid ID");
      return;
    }
    const id: string = req.params.id;
    const user = await UserCases().getOne(id);
    if (user) {
      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        surNames: user.surNames,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
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
      res.status(400).send(validation.error?.details[0].message);
      return;
    }
    const body: UserCreation = req.body;
    const newUser = await UserCases().create(body);
    if (newUser) {
      console.log(newUser.id);
      res.status(201).json({
        id: newUser.id,
        firstName: newUser.firstName,
        surNames: newUser.surNames,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
      });
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
      res.status(400).send(validation.error?.details[0].message);
      return;
    }
    const body: UserVerify = req.body;
    const exists = await UserCases().login(body);
    if (exists) {
      const token = await tokenManager().accessToken(body);
      res.status(200).json({ accessToken: token });
      return;
    }
    res.status(400).send("Invalid email or password");
    return;
  }
);
