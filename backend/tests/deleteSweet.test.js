const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/sweetModel");

describe("Sweet Deletion - DELETE /api/sweets/:id", () => {
  let sweet;

  beforeEach(async () => {
    await Sweet.deleteMany();
    sweet = await Sweet.create({
      name: "Jalebi",
      category: "milk-based",
      price: 25,
      quantity: 10,
    });
  });

  afterEach(async () => {
    await Sweet.deleteMany();
  });

  describe("Valid Deletion", () => {
    it("should delete a sweet by valid ID", async () => {
      const res = await request(app).delete(`/api/sweets/${sweet._id}`);
      expect(res.statusCode).toBe(204);

      const exists = await Sweet.findById(sweet._id);
      expect(exists).toBeNull();
    });
  });

  describe("Invalid or Non-existent IDs", () => {
    it("should return 404 if sweet does not exist", async () => {
      const fakeId = "64b9b8b8b8b8b8b8b8b8b8b8"; // valid ObjectId format
      const res = await request(app).delete(`/api/sweets/${fakeId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toMatch(/sweet not found/i);
    });

    it("should return 400 if ID is invalid", async () => {
      const res = await request(app).delete("/api/sweets/invalid-id");
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/invalid.*id/i);
    });
  });
});
