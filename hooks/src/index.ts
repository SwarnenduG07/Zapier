import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const client = new PrismaClient();
app.use(express.json());
app.post("/hooks/catch/:userId/:zapId", async(req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    await client.$transaction(async tx => {

       const run =  await client.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body,
            }
        });
        await client.zapRunOutBox.create({
            data: {
                zapRunId: run.id
            }
        })
    })
    res.json({
        message: "WebHook recived"
    })
})

app.listen(3004, () => {
    console.log("Listening on 3004");
})