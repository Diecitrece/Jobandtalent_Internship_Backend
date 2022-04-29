import jwt, { Secret } from "jsonwebtoken";
import { UserVerify } from "../../../core/application/ports/input/userCRUD.port";
import { TokenPort } from "../../../core/application/ports/output/token.port";

export const tokenCreator = (): TokenPort => {
  const accessToken = async (item: UserVerify) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign(item, secretKey as Secret);
  };
  const refreshToken = async (item: string) => {
    return "ah";
  };
  return { accessToken, refreshToken };
};
