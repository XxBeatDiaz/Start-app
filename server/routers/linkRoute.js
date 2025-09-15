import { Router } from "express";
import { addLink,updateLink,deleteLink,getLinks } from "../controllers/controllerLink";
const router = Router();

router.get("/getall", getLinks)
router.post("/addlink", addLink)
router.delete("/deletelink", deleteLink)
router.put("/updatelinke", updateLink)


export default router;
