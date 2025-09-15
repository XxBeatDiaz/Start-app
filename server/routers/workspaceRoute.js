import { Router } from "express";
import {getProjects} from "../controllers/controllerWorkSpace.js"

const router = Router();

router.get("/getall",getProjects)

export default router;
