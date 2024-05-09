import fs from "node:fs/promises";
import {
  isServicesArray,
  makeResponseBody,
  type Service,
  tryParseJson,
} from "@/lib/util";

const jsonLocation = "./data/mockBackend.json";
const headers = { "Content-Type": "application/json" };

export const GET = async (req: Request) => {
  try {
    const data = await fs.readFile(jsonLocation, "utf-8");
    const services = tryParseJson<Service[]>(data, isServicesArray);
    if (services) {
      return new Response(makeResponseBody("ok", services), { headers });
    }
    return new Response(
      makeResponseBody(
        "error",
        "There was a problem validating the data from the database",
      ),
      { headers },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    return new Response(makeResponseBody("error", message), { headers });
  }
};
