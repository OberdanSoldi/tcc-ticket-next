import { EXTERNAL_API_URL } from "@/config/serverEnvScheme";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await axios.post(`${EXTERNAL_API_URL}/auth/login`, {
    ...body,
  });

  return NextResponse.json({
    access_token: `Bearer ${response.data.access_token}`,
  });
}
