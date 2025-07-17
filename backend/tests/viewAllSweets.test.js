const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/sweetModel");

describe("View All Sweets - GET /api/sweets", () => {
  beforeEach(async () => {
    await Sweet.deleteMany();
    await Sweet.create([
      {
        name: "Kaju Katli",
        category: "nut-based",
        price: 80,
        quantity: 25,
      },
      {
        name: "Rasgulla",
        category: "milk-based",
        price: 50,
        quantity: 10,
      },
    ]);
  });

  afterEach(async () => {
    await Sweet.deleteMany();
  });

  it("should return all sweets with status 200", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.results).toBe(2);
    expect(Array.isArray(res.body.data)).toBe(true);

    const sweetNames = res.body.data.map((sweet) => sweet.name);
    expect(sweetNames).toContain("Kaju Katli");
    expect(sweetNames).toContain("Rasgulla");
  });

  it("should return an empty array when no sweets exist", async () => {
    await Sweet.deleteMany(); // Ensure DB is empty
    const res = await request(app).get("/api/sweets");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.results).toBe(0);
    expect(res.body.data).toEqual([]);
  });
});
