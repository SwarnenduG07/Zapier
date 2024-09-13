import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SignupSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body.username;
    const parsedData = SignupSchema.safeParse(body);


    if(!parsedData) {
        return res.status(411).json({
            message: "Incorect Inputs"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data?.username
        }
    });

    if (userExists) {
        return res.status(403).json({
             message: "User already exists"
        })
    }
   
})
router.post("/signin", (req, res) => {
    console.log("signup");


})
router.get("/user", authMiddleware, (req, res) => {
    console.log("signup");


})

export const userRouter = router;