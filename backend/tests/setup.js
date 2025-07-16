const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

beforeAll(async () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  await mongoose.connect(DB);
});

afterAll(async () => {
  await mongoose.connection.close();
});
