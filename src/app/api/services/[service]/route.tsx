import { NextResponse } from "next/server";
import fs from "node:fs/promises";

export const GET = async (
  req: Request,
  { params }: { params: { service: string } }
) => {
  const data = await fs.readFile("./data/mockBackend.json", "utf-8");
  const services = JSON.parse(data);
  const service = services[params.service];
  console.log(params);
  return new NextResponse(service.healthy ? "Healthy" : "Unhealthy");
};
type PutParams = { params: { service: string } };
export const PUT = async (req: Request, { params }: PutParams) => {
  const newData = await req.json();

  try {
    await fs.writeFile(
      "./data/mockBackend.json",
      JSON.stringify(newData),
      "utf-8"
    );
    return new NextResponse(newData);
  } catch (error) {
    return new NextResponse("update unsuccessful");
  }
};
console.log(NextResponse);
