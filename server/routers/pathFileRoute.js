import { Router } from "express";
import { getPaths, addPath, deletePath, update ,getPath} from "../controllers/controllerPath.js"

const router = Router();

router.get("/get-all", getPaths)
router.get("/get/:id", getPath)
router.post("/add", addPath)
router.delete("/delete/:id", deletePath)
router.put("/update/:id", update)


export default router;