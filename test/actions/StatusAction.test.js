import request from "supertest";
import { Application } from "../../src/application/Application";

describe("StatusAction", () => {
    test("should return OK", async () => {
        let response = await request(Application).get("/status");

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("OK");
    });
});
