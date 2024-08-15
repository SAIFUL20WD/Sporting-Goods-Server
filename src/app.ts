import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
// import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Sporting Goods");
});

// app.use(globalErrorHandler);
app.use(notFound);

export default app;