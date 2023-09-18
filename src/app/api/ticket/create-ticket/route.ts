import { EXTERNAL_API_URL } from "@/config/serverEnvScheme";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");
    const payload = await req.json();

    const response = await axios.post(`${EXTERNAL_API_URL}/ticket`, {
      headers: { authorization: auth },
      ...payload,
    });

    return NextResponse.json({}, { status: response.status });
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
