import app from "./src/app";
import { calculatePercentage } from "./src/config/utils";
import request from "supertest";

/**
 * Jest concurrently runs all test case at the same time, which sometimes can cause issues. To make
 * jest run test cases sequentially, we have to use another flag while running the test cases, that
 * is --runInBand.
 */

describe.skip("App", () => {
    it("should calculate the percentage", () => {
        const result = calculatePercentage(100, 50);
        expect(result).toBe(50);
    });
    it("Should return 200 status for the root route", async () => {
        const response = await request(app).get("/").send();
        expect(response.statusCode).toBe(200);
    });
});
