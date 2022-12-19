import calendarApi from "../../src/api/calendarApi";
import { describe, test, expect } from "vitest";

describe("Tests of calendarApi", () => {
  test("should have default config", async () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("should have x-token header in all requests", async () => {
    const token = "ABC-123-XYZ";
    localStorage.setItem("token", token);
    const resp = await calendarApi.get("/auth");
    expect(resp.config.headers?.["x-token"]).toBe(token);
  });
});
