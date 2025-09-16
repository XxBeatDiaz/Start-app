import { Router } from "express";
import { addLink,updateLink,deleteLink,getLinks } from "../controllers/controllerLink";
const router = Router();

router.get("/getall", getLinks)
router.post("/add", addLink)
router.delete("/delete", deleteLink)
router.put("/update", updateLink)


export default router;
