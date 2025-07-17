const request = require("supertest");
const app = require("../app");

describe("Project Setup Verification", () => {
  it("Should confirm that health check route works", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Project setup working correctly ✅" });
  });
  it("Should not return 404", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).not.toBe(404);
  });
  test("should return 404 for unknown route", async () => {
    const res = await request(app).get("/non-existent-endpoint");
    expect(res.statusCode).toBe(404);
  });
  it("Should respond with a JSON object", async () => {
    const res = await request(app).get("/health");
    expect(res.headers["content-type"]).toMatch(/json/);
  });
});
