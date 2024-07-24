import express from "express";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserService";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

const router = express.Router();

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);

const authController = new AuthController(userService);

router.post("/register", (req, res) => authController.register(req, res));

export default router;

/*
Understanding `this` Binding in Callbacks

When invoking class methods as callbacks in JavaScript, the context of `this` can become confusing. Typically, `this` refers to the object invoking the method. However, in callback scenarios, such as passing `authController.register` to `router.post`, `this` may lose its intended context, which is the `authController` instance.

Why does this happen?
- In JavaScript, the context of `this` is determined by how a function is called, not where it's defined. When `register` is passed directly as a callback, it's called within the context of `router.post`, not `authController`.

How can we maintain the correct `this` context?
1. **Using `.bind`**: One approach is to bind `this` to the method explicitly using `register.bind(authController)`.
2. **Arrow Functions**: As demonstrated, wrapping the method call within an arrow function preserves the `this` context. Arrow functions do not have their own `this`; they inherit it from the surrounding scope, which in this case is correctly bound to `authController`.

This ensures that inside `register`, `this` refers to `authController`, allowing full access to its properties and methods as intended.
*/
