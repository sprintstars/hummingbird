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
