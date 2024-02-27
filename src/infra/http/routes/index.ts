import { Router } from "express";
import { emailRouter } from "./email";

const router = Router();

router.use("/api", emailRouter);

export { router };
