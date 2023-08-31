import { EXTERNAL_API_URL } from "@/config/serverEnvScheme";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");

    const response = await axios.get(`${EXTERNAL_API_URL}/user/tickets`, {
      headers: { authorization: auth },
    });

    return NextResponse.json({ response: response.data });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { ...error.response?.data },
        { status: error.response?.status }
      );
    }
    return NextResponse.json({ message: error });
  }
}
