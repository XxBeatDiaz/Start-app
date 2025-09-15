import { Router } from "express";
import { getProjects, addProject, deleteProject, updateProject } from "../controllers/controllerWorkSpace.js"

const router = Router();

router.get("/get-all", getProjects)
router.post("/add-project", addProject)
router.delete("/delete/:id", deleteProject)
router.put("/update/:id", updateProject)

export default router;
