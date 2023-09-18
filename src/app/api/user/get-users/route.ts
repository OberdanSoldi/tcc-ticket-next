import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { EXTERNAL_API_URL } from "@/config/serverEnvScheme";

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");

    const response = await axios.get(`${EXTERNAL_API_URL}/user`, {
      headers: { authorization: auth },
    });

    return NextResponse.json({ users: response.data });
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
