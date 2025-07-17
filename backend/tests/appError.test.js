const AppError = require("../utils/appError"); // Adjust path if needed

describe("AppError Class", () => {
  test('should set status to "fail" for 4xx status code', () => {
    const err = new AppError("Client error", 404);
    expect(err.statusCode).toBe(404);
    expect(err.status).toBe("fail");
    expect(err.isOperational).toBe(true);
  });

  test('should set status to "error" for 5xx status code', () => {
    const err = new AppError("Server error", 500);
    expect(err.statusCode).toBe(500);
    expect(err.status).toBe("error");
    expect(err.isOperational).toBe(true);
  });
});
