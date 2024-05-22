import { HttpError, isHttpError } from "http-errors";
import express, { NextFunction } from "express";
import serverlessExpress from "@codegenie/serverless-express";
import cors from "cors";

import apolloServer from "./graphql";
import stripeRouter from "./stripe";
import usersRouter from "./users/router";
import notesRouter from "./notes/router";

const isDev = process.env.ARC_ENV === "testing";

// * routers
const apiRouter = express.Router();
apiRouter.use("/graphql", apolloServer);
apiRouter.use("/create-payment-intent", stripeRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/notes", notesRouter);
apiRouter.get("/health", (req, res) => res.send("ok"));

const app = express();

// * api server
if (isDev) {
  app.options("*", cors());
  app.use(cors());
}
app.use(express.json());
app.use("/api", apiRouter);

// * Error handling middleware
app.use(
  (
    err: HttpError,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    if (err instanceof HttpError) {
      const { statusCode, message } = err;
      const response = {
        code: statusCode,
        error: isHttpError(err) ? err.name : "Error",
        message: message,
      };
      res.status(statusCode).json(response);
    } else {
      const response = {
        code: 500,
        error: "Internal Server Error",
        message: "Something went wrong on the server",
      };
      res.status(500).json(response);
    }
    next(err);
  }
);

exports.handler = serverlessExpress({ app });
