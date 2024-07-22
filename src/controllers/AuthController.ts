import { Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";

// We are using the class syntax to create a controller here but function could also have been used, because in class we can group things together in a better way that's why we are preferring it over function
export class AuthController {
    userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }
    async register(req: RegisterUserRequest, res: Response) {
        const { firstName, lastName, email, password } = req.body;
        // we have extracted the db specific low level logic from here and encapsulated it inside a class. Now to use that we are going to initialize the class here. But there is a problem with initializing the class inside a controller, if we do that our controller will get coupled with the service(class) we'll initiate here. Coupling means our controller gets dependent upon a particular service and won't work without it, ideally it shouldn't happen. To de-couple this we have to make use of dependency injection.

        await this.userService.create({
            firstName,
            lastName,
            email,
            password,
        });
        res.status(201).json();
    }
}

// Normally we would have followed singleton pattern and created an instance of this class and exported it, but we are not doing that because later on we are going to do dependency injection and we will be using the class directly in the routes file to create an instance of it

// What is dependency injection?
// It is nothing but receiving dependencies in the constructor function that we need in our class, instead of creating them internally
