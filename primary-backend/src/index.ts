import express from "express";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";
import   cors from "cors";
import { triggerRouter } from "./router/triggerRouter";
import { actionRouter } from "./router/actions";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/user", userRouter);

app.use("/api/v1/zap", zapRouter);

app.use("/api/v1/trigger", triggerRouter);

app.use("/api/v1/action", actionRouter);




app.listen(3005, () => {
    console.log("Connneted");
})