
import { Router } from "express";
import { authMiddleware } from "../middleware";

import { prismaClient } from "../db";
import { ZapSchema } from "../types";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id: string = req.id;
    const body = req.body;
    const parsedData = ZapSchema.safeParse(body);
    
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }   

    const zapId = await prismaClient.$transaction(async (tx) => {
        try {
          const zap = await tx.zap.create({
            data: {
              userId: parseInt(id),
              triggerId: "",
              actions: {
                create: parsedData.data.actions.map((x, index) => ({
                  actionId: x.availableActionId,
                  sortringOrder: index,
                  metadata: x.actionMetaData,
                })),
              },
            },
          });
      
          const trigger = await tx.trigger.create({
            data: {
              triggerId: parsedData.data.availableTriggerId,
              zapId: zap.id,
            },
          });
      
          await tx.zap.update({
            where: { id: zap.id },
            data: { triggerId: trigger.id },
          });
      
          return zap.id;
        } catch (error) {
          console.error("Error in transaction", error);
          throw error;  // Ensure transaction rollback
        }
      });
    return res.json({
        zapId
    })
})

router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const zaps = await prismaClient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zaps
    })
})

router.get("/:zapId", authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;

    const zap = await prismaClient.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zap
    })

})

export const zapRouter = router;