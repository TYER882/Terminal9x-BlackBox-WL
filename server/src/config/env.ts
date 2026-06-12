import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 5000),
  mongodbUri: process.env.MONGODB_URI ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "",
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
};

if (env.jwtSecret === "" && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET must be set in production.");
}
