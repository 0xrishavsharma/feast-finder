/**
 * This module creates the instance of the application.
 * The actual server logic is contained within the server.ts file.
 */
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import logger from "./config/logger";
import { HttpError } from "http-errors";
import authRouter from "./routes/auth";

const app = express();
app.use(express.json());

/**
 * If you make any route handler async, then our global error handler middleware will not be able to catch the error thrown from the async route handler. To solve this issue, instead of using "throw err" we need to make use of the next() function and pass the error to it as a parameter "next(err)", so that the error is passed to the global error handler middleware by the next() function
 */

app.get("/", async (req, res) => {
    /**
     * Whenever we throw an error from a route handler, it will be caught by the global error
     * handler middleware.
     */
    res.status(200).send("Hey, welcome to Feast Finder's Auth Service!");
});

app.use("/auth", authRouter); // added "/auth" prefix for the authRouter routes

/**
 * Global error handler middleware.
 * This should be the last middleware in the stack.
 * It standardizes the error response format.
 *
 * @param {unknown} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);

    /**
     * Whatever errors we return from the server to the client should always
     * be in the same format throughout the application. Client doesn't have to
     * worry to write custom logic for every error that comes from the server.
     */

    /**
     * The format that we are going to use for sending errors to the client will be of a validation library. The validation library that we are going to use in our project sends data in the format that is used in the given code snippet.
     */
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: "",
                location: "",
            },
        ],
    });
});
export default app;
