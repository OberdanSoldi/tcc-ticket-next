import { EXTERNAL_API_URL } from "@/config/serverEnvScheme";
import axios, { AxiosError } from "axios";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(`${EXTERNAL_API_URL}/auth/login`, {
      ...body,
    });

    return NextResponse.json({
      access_token: `Bearer ${response.data.access_token}`,
    });
  } catch (ex) {
    if (ex instanceof AxiosError) {
      return NextResponse.json(
        {},
        {
          status: ex.response?.data.statusCode,
          statusText: ex.response?.data.message,
        }
      );
    }
    console.error(ex);
    throw ex;
  }
}
