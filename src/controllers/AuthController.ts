import { Request, Response } from "express";

// We are using the class syntax to create a controller here but function could also have been used, because in class we can group things together in a better way that's why we are preferring it over function
export class AuthController {
    register(req: Request, res: Response) {
        res.status(201).json("User registered successfully!");
    }
}

// Normally we would have followed singleton pattern and created an instance of this class and exported it, but we are not doing that because later on we are going to do dependency injection and we will be using the class directly in the routes file to create an instance of it
