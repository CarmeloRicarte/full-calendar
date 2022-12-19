import { vi } from "vitest";

/* Mocking the getEnvironments function to return the process.env object. */
require("dotenv").config({
  path: ".env.test",
});

vi.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({
    ...process.env,
  }),
}));
