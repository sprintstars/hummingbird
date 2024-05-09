import { NextResponse } from "next/server";
import fs from "node:fs/promises";

// return all the services from the json file
export const GET = async (req: Request) => {
  const data = await fs.readFile("./data/mockBackend.json", "utf-8");
  // have an empty array to store the services
  if (!data) {
    return new NextResponse("no Services Found");
  }
  //push the serices into the array
  return new NextResponse(data);
};
