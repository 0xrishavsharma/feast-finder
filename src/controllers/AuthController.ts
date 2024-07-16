import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface RegisterUserRequest extends Request {
    body: UserData;
}

// We are using the class syntax to create a controller here but function could also have been used, because in class we can group things together in a better way that's why we are preferring it over function
export class AuthController {
    async register(req: RegisterUserRequest, res: Response) {
        const { firstName, lastName, email, password } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const response = await userRepository.save({
            firstName,
            lastName,
            email,
            password,
        });
        res.status(201).json(response);
    }
}

// Normally we would have followed singleton pattern and created an instance of this class and exported it, but we are not doing that because later on we are going to do dependency injection and we will be using the class directly in the routes file to create an instance of it
