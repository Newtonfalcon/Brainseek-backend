import {Router} from "express";
import {getMessage, postMessage, updateMessage} from "../controllers/message.controllers.js"

const messageRouter = Router();

messageRouter.get("/:id", getMessage)
messageRouter.post("/:id", postMessage);
messageRouter.put("/:id", updateMessage)

export default messageRouter;