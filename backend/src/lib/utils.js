import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not configured");

<<<<<<< HEAD
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
=======
    const {JWT_SECRET} = ENV;
    if(!JWT_SECRET) throw new Error("JWT_SECRET is not configured");
>>>>>>> 8ac139b8b6a79992408ec71105b52be9953ca1cc

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

<<<<<<< HEAD
  return token;
};
=======
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: ENV.NODE_ENV === "development" ? false : true,
    });

    return token;
}
>>>>>>> 8ac139b8b6a79992408ec71105b52be9953ca1cc
