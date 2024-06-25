// Following the Test Driven Development(TDD) approach
import request from "supertest";
import app from "../../src/app";

// describe is nothing but a wrapper to wrap all related test cases
describe("POST /auth/register", () => {
    // There are multiple ways how we can start writing test cases,
    // 1. Starting the it block directly
    // 2. Grouping test cases based on happy path or positive test cases and sad path or
    // negative test cases.
    // Here we'll go with the happy and sad path approach

    // Happy path
    describe("Given all fields", () => {
        // While writing test cases under TDD, we don't have to think about the implementation, we have to think from the perspective of user, how things should work w.r.t. user

        it("should return the 201 status code", async () => {
            // While writing test cases we have to following a AAA approach
            // 1. Arrange  - collecting or setting up the data that we need for testing
            const userData = {
                userFirstName: "John",
                userLastName: "Doe",
                userEmail: "john.doe@mail.com",
            };
            // 2. Act - Performing the action that we want to test, in this case making a request to the API
            const res = await request(app)
                .post("/auth/register")
                .send(userData);
            // 3. Assert - Checking if we are getting the expected output or not
            expect(res.status).toBe(201);
        });
    });

    // Sad path
    describe("Given missing fields", () => {
        it("should return an error", async () => {
            // Test case implementation
        });
    });
});
