import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/", authMiddleware, (req, res) => {
   console.log("Zap");
   
})
router.get("/", authMiddleware,(req, res) => {
    console.log("signup");
})
router.get("/:zapId", authMiddleware,(req, res) => {
    console.log("signup");
})


export const zapRouter = router;