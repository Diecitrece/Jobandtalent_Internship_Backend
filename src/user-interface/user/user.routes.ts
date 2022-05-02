import {
  NextFunction,
  Request,
  Response,
  Router,
  RequestHandler,
} from "express";
import { UserCases } from "../../core/application/use-cases/user/user.use-cases";
import { schemaUserLogin, schemaUserRegister } from "./validate-body";
import {
  UserCreation,
  UserVerify,
} from "../../core/application/ports/input/userCRUD.port";
import bodyParser from "body-parser";
import { tokenManager } from "../../infrastructure/user/jwt/manageToken";

const authenticateToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  const verified = await tokenManager().verifyToken(token);
  if (!verified) {
    res.sendStatus(403);
    return;
  }
  next();
};

export const userRouter = Router();
userRouter.use(bodyParser.json());
userRouter.get(
  "/api/users",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    const users = await UserCases().getAll();
    res.status(200).json(users);
    return;
  }
);
userRouter.get(
  "/api/users/:id",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    if (typeof req.query.id !== "string") {
      res.status(400).send("Invalid ID");
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
      res.status(400).send(validation.error?.details[0].message);
      return;
    }
    const body: UserCreation = req.body;
    const newUser = await UserCases().create(body);
    if (newUser) {
      res.status(201).json(newUser);
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
