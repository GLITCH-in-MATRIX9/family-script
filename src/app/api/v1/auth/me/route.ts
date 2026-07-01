import { NextRequest } from "next/server";
import { AuthController } from "@/modules/auth/auth.controller";

const controller = new AuthController();

export async function GET(request: NextRequest) {
  return controller.me(request);
}