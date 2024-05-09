import { NextResponse } from "next/server";
import fs from "node:fs/promises";

export const GET = async (req: Request) => {
  const data = await fs.readFile("./data/mockBackend.json", "utf-8");

  if (!data) {
    return new NextResponse("no Services Found");
  }

  return new NextResponse(data);
};
