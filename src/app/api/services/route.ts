import fs from "node:fs/promises";
import path from "node:path";
import {
  isServicesArray,
  makeResponseBody,
  type Service,
  tryParseJson,
} from "@/lib/utils";

const jsonLocation = path.resolve("data/mockBackend.json");
const headers = { "Content-Type": "application/json" };

export const GET = async (req: Request) => {
  try {
    const data = await fs.readFile(jsonLocation, "utf-8");
    const services = tryParseJson<Service[]>(data, isServicesArray);
    if (services === null) {
      return new Response(
        makeResponseBody(
          "error",
          "There was a problem validating the data from the database",
        ),
        { headers },
      );
    }
    return new Response(makeResponseBody("ok", services), { headers });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    return new Response(makeResponseBody("error", message), { headers });
  }
};
