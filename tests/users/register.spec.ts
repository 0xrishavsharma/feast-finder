// Following the Test Driven Development(TDD) approach
import request from "supertest";
import app from "../../src/app";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";
import { truncateTables } from "../utils";
import { User } from "../../src/entity/User";

// describe is nothing but a wrapper to wrap all related test cases
describe("POST /auth/register", () => {
    // There are multiple ways how we can start writing test cases,
    // 1. Starting the it block directly
    // 2. Grouping test cases based on happy path or positive test cases and sad path or
    // negative test cases.
    // Here we'll go with the happy and sad path approach

    let connection: DataSource;

    // These are all hooks provided by jest that can run before or after all tests, or before or after every test
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    // after we do testing on the db inside a test we need to flush the test database to ensure that previous changes doesn't affect any future testing
    beforeEach(async () => {
        // truncate(cleaning) the database
        await truncateTables(connection);
    });

    afterAll(async () => {
        if (connection) {
            await connection.destroy(); //destroying the db connection after all tests are completed
        }
    });

    // Happy path
    describe("Given all fields", () => {
        // While writing test cases under TDD, we don't have to think about the implementation, we have to think from the perspective of user, how things should work w.r.t. user

        it("should return the 201 status code", async () => {
            // While writing test cases we have to following a AAA approach
            // 1. Arrange  - collecting or setting up the data that we need for testing
            const userData = {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@mail.com",
                password: "secret",
            };
            // 2. Act - Performing the action that we want to test, in this case making a request to the API
            const res = await request(app)
                .post("/auth/register")
                .send(userData);
            // 3. Assert - Checking if we are getting the expected output or not
            expect(res.status).toBe(201);
        });

        it("should return valid json response", async () => {
            // 1. Arrange
            const userData = {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@mail.com",
                password: "secret",
            };
            // 2. Act
            const res = await request(app)
                .post("/auth/register")
                .send(userData);
            // 3. Assert
            expect(res.headers["content-type"]).toEqual(
                expect.stringContaining("json"),
            );
        });

        it("should persist newly registered user data in the db", async () => {
            // Arrange
            const userData = {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@gmail.com",
                password: "secret",
            };
            // Act
            await request(app).post("/auth/register").send(userData);

            // Assert
            // Here we have to make a connection to the db(using TypeORM here), and check if the newly registered user is present in the User table or not
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
        });
    });

    // Sad path
    describe("Given missing fields", () => {
        it("should return an error", async () => {
            // Test case implementation
        });
    });
});
