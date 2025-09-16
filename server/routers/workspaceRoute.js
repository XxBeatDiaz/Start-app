import { Router } from "express";
import { getProjects, addProject, deleteProject, updateProject, getWorkspace } from "../controllers/controllerWorkSpace.js"

const router = Router();

router.get("/get-all", getProjects)
router.get("/get/:id", getWorkspace)
router.post("/add", addProject)
router.delete("/delete/:id", deleteProject)
router.put("/update/:id", updateProject)

export default router;
