const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/sweetModel");

describe("Sweet Creation - POST /api/sweets", () => {
  // Cleanup DB after each test
  afterEach(async () => {
    await Sweet.deleteMany();
  });

  describe("Invalid Inputs", () => {
    it("should return 400 if no data is provided", async () => {
      const res = await request(app).post("/api/sweets").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/name/i);
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/api/sweets").send({
        name: "Kaju Katli",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/category/i); // should highlight missing field
    });

    it("should return 400 if price is negative", async () => {
      const res = await request(app).post("/api/sweets").send({
        name: "Rasgulla",
        category: "milk-based",
        price: -50,
        quantity: 10,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/price.*positive/i);
    });

    it("should return 400 if quantity is negative", async () => {
      const res = await request(app).post("/api/sweets").send({
        name: "Ladoo",
        category: "milk-based",
        price: 30,
        quantity: -2,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/quantity.*non-negative/i);
    });

    it("should return 400 if category is invalid", async () => {
      const res = await request(app).post("/api/sweets").send({
        name: "Barfi",
        category: "sugary", // not in enum
        price: 40,
        quantity: 10,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/category.*must be one of/i);
    });
  });

  describe("Valid Inputs", () => {
    it("should create a sweet with all valid fields", async () => {
      const sweet = {
        name: "Gulab Jamun",
        category: "milk-based",
        price: 50,
        quantity: 15,
      };

      const res = await request(app).post("/api/sweets").send(sweet);
      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toMatchObject(sweet);

      const saved = await Sweet.findOne({ name: "Gulab Jamun" });
      expect(saved).toBeTruthy();
      expect(saved.category).toBe("milk-based");
    });

    it("should ignore extra fields not in schema", async () => {
      const sweet = {
        name: "Soan Papdi",
        category: "nut-based",
        price: 35,
        quantity: 20,
        random: "should not be stored",
      };

      const res = await request(app).post("/api/sweets").send(sweet);
      expect(res.statusCode).toBe(201);
      expect(res.body.data).not.toHaveProperty("random");

      const saved = await Sweet.findOne({ name: "Soan Papdi" });
      expect(saved).not.toHaveProperty("random");
    });
  });
});
