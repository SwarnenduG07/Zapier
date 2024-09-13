import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/signup", (req, res) => {
   console.log("signup");
   
})
router.post("/signin", (req, res) => {
    console.log("signup");


})
router.get("/user", authMiddleware, (req, res) => {
    console.log("signup");


})

export const userRouter = router;