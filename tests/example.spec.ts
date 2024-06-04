import { test, expect, request } from "@playwright/test";

const headers = {
  "Content-Type": "application/json",
};

test.describe("GET API Endpoint Tests", () => {
  const baseURL = "https://your.api/endpoint";

  test("should return 500 if user parameter is missing", async ({ request }) => {
    const response = await request.get(baseURL);
    expect(response.status()).toBe(500);

    const responseBody = await response.json();
    expect(responseBody).toEqual({
      status: "error",
      message: "A `user` parameter must be supplied",
    });
  });

  test("should return services for valid user parameter", async ({ request }) => {
    const userId = "validUserId";
    const limit = 5; // or any other number you want to test
    const response = await request.get(`${baseURL}?user=${userId}&limit=${limit}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.status).toBe("ok");
    expect(Array.isArray(responseBody.data)).toBe(true);
    // Add more checks based on the structure of `services`
  });

  test("should return default limit when limit parameter is not provided", async ({ request }) => {
    const userId = "validUserId";
    const response = await request.get(`${baseURL}?user=${userId}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.status).toBe("ok");
    expect(Array.isArray(responseBody.data)).toBe(true);
    // Verify the default limit is applied, if applicable
  });
});
