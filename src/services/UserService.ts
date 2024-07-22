// Bringing all the services code related to db here, so that down the line if we plan to switch our db, it will be easier to replace code related to db from a single file. And as a side effect, the controller will be free from low level and db specific queries

import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import { UserData } from "../types";

export class UserService {
    async create({ firstName, lastName, email, password }: UserData) {
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save({
            firstName,
            lastName,
            email,
            password,
        });
    }
}
