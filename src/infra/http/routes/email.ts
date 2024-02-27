import { Router } from "express";
import { SendEmailController } from "../controllers/send-email-controller";

const emailRouter = Router();

const sendMailController = new SendEmailController();

emailRouter.post("/email", sendMailController.create);

export { emailRouter };
