import fs from "node:fs/promises";
import path from "node:path";
import {
  isServicesArray,
  makeResponseBody,
  type Service,
  tryParseJson,
  type Validator,
} from "@/lib/utils";

type ReqOptions = { params: { service: string } };

const jsonLocation = path.resolve("data/mockBackend.json");
const headers = { "Content-Type": "application/json" };

export const GET = async (_: Request, { params }: ReqOptions) => {
  try {
    const data = await fs.readFile(jsonLocation, "utf-8");
    const services = tryParseJson<Service[]>(data, isServicesArray);
    const service = services?.find(
      (serviceObject) => serviceObject.name === params.service
    );
    if (service) {
      return new Response(makeResponseBody("ok", service), { headers });
    }
    return new Response(
      makeResponseBody(
        "not found",
        `Could not find the service called ${params.service}`
      ),
      { headers }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    return new Response(makeResponseBody("error", message), { headers });
  }
};

type ServiceHealth = Pick<Service, "healthy">;

const isServiceHealth: Validator<ServiceHealth> = (
  o: any
): o is ServiceHealth =>
  typeof o.healthy === "boolean" && Object.keys(o).length === 1;
