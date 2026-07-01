import { NextRequest } from "next/server";
import { AuthController } from "@/modules/auth/auth.controller";

const controller = new AuthController();

export async function POST(request: NextRequest) {
  return controller.logout(request);
}