import { Router } from "express";
import { getPaths, addPath, deletePath, updatePath } from "../controllers/controllerPath.js"

const router = Router();

router.get("/get-all", getPaths)
router.post("/add", addPath)
router.delete("/delet:id", deletePath)
router.put("/update:id", updatePath)


export default router;