import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SignInSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import { date } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

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

    await prismaClient.user.create({
        date: {
            email: parsedData.data?.username,
            password: parsedData.data?.password,
            name: parsedData.data?.name,
        }
    })
      //Send Email
    
    return res.json({
        message: "Please verify your account"
    })
   
})
router.post("/signin", async (req, res) => {
    const body = req.body.username;
    const parsedData = SignInSchema.safeParse(body);

    if(!parsedData) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data?.username,
            password: parsedData.data?.password,
        }
    });
    if(!user) {
        return res.status(403).json({
            message: "Sorry Credentials are incorrent"
        })
    }

    const token = jwt.sign({
        id: user.id,
    }, JWT_SECRET)

    res.json({
        token: token,
    })

    
})
router.get("/user", authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        Where: {
            id: id,
        },
        select: {
            name: true,
            email: true,
        }
    });
    res.json({
        user
    })

})

export const userRouter = router;