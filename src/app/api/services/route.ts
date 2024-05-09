import fs from "node:fs/promises";
import {
  isServicesArray,
  makeResponseBody,
  type Service,
  tryParseJson,
} from "@/lib/util";

export const GET = async (req: Request) => {
  const headers = { "Content-Type": "application/json" };

  try {
    const data = await fs.readFile("./data/mockBackend.json", "utf-8");
    const services = tryParseJson<Service[]>(data, isServicesArray);
    if (services) {
      return new Response(makeResponseBody("ok", services), {
        headers,
      });
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
