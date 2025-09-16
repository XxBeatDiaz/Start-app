import { Router } from "express";
import { addLink,updateLink,deleteLink,getLinks,getLink } from "../controllers/controllerLink.js";
const router = Router();

router.get("/get-all", getLinks)
router.get("/get/:id", getLink)
router.post("/add", addLink)
router.delete("/delete/:id", deleteLink)
router.put("/update/:id", updateLink)


export default router;
