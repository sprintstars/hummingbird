import fs from "node:fs/promises";

type Service = {
  name: string;
  timestamp: number;
  healthy: boolean;
};
type Validator<T> = (o: any) => o is T;

const isService: Validator<Service> = (o: any): o is Service =>
  typeof o.name === "string" && typeof o.timestamp === "number" &&
  typeof o.healthy === "boolean";

const isServicesArray: Validator<Service[]> = (o: any): o is Service[] => {
  if (Array.isArray(o)) {
    return o.map(isService).every(Boolean);
  }
  return false;
};

const tryJsonParse = <T>(
  jsonStr: string,
  validator: Validator<T>,
): T | null => {
  try {
    const parsed = JSON.parse(jsonStr);
    // console.log(parsed);
    if (validator(parsed)) {
      return parsed;
    }
    return null;
  } catch (e) {
    return null;
  }
};

const makeResponseBody = (
  status: "ok" | "error" | "not found",
  payload?: any,
) =>
  JSON.stringify({
    status,
    payload,
  });

export const GET = async (req: Request) => {
  const headers = { "Content-Type": "application/json" };

  try {
    const data = await fs.readFile("./data/mockBackend.json", "utf-8");
    const services = tryJsonParse<Service[]>(data, isServicesArray);
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
