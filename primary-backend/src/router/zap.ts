import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapSchema } from "../types";
import { prismaClient } from "../db";
import { date, z } from "zod";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    const body = req.body; 
    const parsedData = ZapSchema.safeParse(body);
    if(!parsedData.success) {
          return res.status(411).json({
            message: "Incorrect inputs"
          });
    }
    await prismaClient.$transaction(async tx => {
         const zap = await prismaClient.zap.create({
            data: {
                triggerId: "",
                actions: {
                    create: parsedData.data.actions.map((x, index) => ({
                        actionId: x.availableActionId,
                        sortringOrder: index
                    }))
                 }
             }
    
        })
        const trigger = await tx.trigger.create({
            data : {
                triggerId: parsedData.data.availableTriggerId,
                zapId: zap.id
            }
        });
        await prismaClient.zap.update({
            where: {
                id: zap.id,
            },
            data: {
                triggerId: trigger.id,
            }
        })
    })
    
   
})
router.get("/", authMiddleware,(req, res) => {
    console.log("signup");
})
router.get("/:zapId", authMiddleware,(req, res) => {
    console.log("signup");
})


export const zapRouter = router;