import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const URL = process.env.EXTERNAL_API_URL! || "";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await axios.post(`${URL}/auth/login`, { ...body });

  return NextResponse.json({
    access_token: `Bearer ${response.data.access_token}`,
  });
}
