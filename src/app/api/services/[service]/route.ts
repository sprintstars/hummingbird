import fs from "node:fs/promises";
import {
  isServicesArray,
  makeResponseBody,
  type Service,
  tryParseJson,
  type Validator,
} from "@/lib/util";

const jsonLocation = "./data/mockBackend.json";

type ReqOptions = { params: { service: string } };

const headers = { "Content-Type": "application/json" };

export const GET = async (
  _: Request,
  { params }: ReqOptions,
) => {
  try {
    const data = await fs.readFile(jsonLocation, "utf-8");
    const services = tryParseJson<Service[]>(data, isServicesArray);
    const service = services?.find((serviceObject) =>
      serviceObject.name === params.service
    );
    if (service) {
      return new Response(makeResponseBody("ok", service), { headers });
    }
    return new Response(
      makeResponseBody(
        "not found",
        `Could not find the service called ${params.service}`,
      ),
      { headers },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    return new Response(
      makeResponseBody(
        "error",
        message,
      ),
      { headers },
    );
  }
};

type ServiceHealth = Pick<Service, "healthy">;

const isServiceHealth: Validator<ServiceHealth> = (
  o: any,
): o is ServiceHealth =>
  typeof o.healthy === "boolean" && Object.keys(o).length === 1;

export const PUT = async (req: Request, { params }: ReqOptions) => {
  try {
    const data = await fs.readFile(jsonLocation, "utf-8");
    const services = tryParseJson<Service[]>(data, isServicesArray);

    if (services === null) {
      return new Response(
        makeResponseBody(
          "error",
          `There was a problem parsing the services data`,
        ),
        { headers },
      );
    }

    const serviceIndexToUpdate = services.findIndex((s) =>
      s.name === params.service
    );

    if (serviceIndexToUpdate < 0) {
      return new Response(
        makeResponseBody(
          "not found",
          `Could not find the service called ${params.service}`,
        ),
        { headers },
      );
    }

    const body = await req.text();
    const serviceUpdate = tryParseJson<ServiceHealth>(
      body,
      isServiceHealth,
    );

    if (serviceUpdate === null) {
      return new Response(
        makeResponseBody(
          "error",
          `There was a problem parsing the body of the request`,
        ),
        { headers },
      );
    }

    const newService = Object.assign<
      Pick<Service, "name" | "timestamp">,
      ServiceHealth
    >(
      { name: params.service, timestamp: Date.now() },
      serviceUpdate,
    );

    services[serviceIndexToUpdate] = newService;

    await fs.writeFile(
      jsonLocation,
      JSON.stringify(services),
      "utf-8",
    );

    return new Response(makeResponseBody("ok", newService), { headers });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Oops!";
    return new Response(
      makeResponseBody(
        "error",
        message,
      ),
      { headers },
    );
  }
};
