import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import { auth } from "@/config/auth";
import { authenticate, AuthenticatedRequest } from "@/middleware/authenticate";

import { authService } from "./auth.service";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resendVerificationSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "./auth.validators";

export class AuthController {
  async register(request: NextRequest) {
    try {
      const body = await request.json();
      const data = registerSchema.parse(body);

      const user = await authService.register(data);

      return NextResponse.json(
        { success: true, message: "User registered successfully", data: user },
        { status: 201 },
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      return NextResponse.json(
        { success: false, message },
        { status: message === "Email already exists" ? 409 : 400 },
      );
    }
  }

  async login(request: NextRequest) {
    try {
      const body = await request.json();
      const data = loginSchema.parse(body);

      const { user, session } = await authService.login(data);

      const ctx = await auth.$context;
      const cookieName = ctx.authCookies.sessionToken.name;

      const response = NextResponse.json(
        { success: true, data: user },
        { status: 200 },
      );

      response.cookies.set(cookieName, session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: session.expiresAt,
      });

      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      return NextResponse.json(
        { success: false, message },
        { status: message === "Invalid email or password" ? 401 : 400 },
      );
    }
  }

  async logout(request: NextRequest) {
    try {
      const token = getSessionCookie(request.headers);

      if (!token) {
        return NextResponse.json(
          { success: false, message: "No active session" },
          { status: 401 },
        );
      }

      await authService.logout(token);

      const ctx = await auth.$context;
      const cookieName = ctx.authCookies.sessionToken.name;

      const response = NextResponse.json({ success: true }, { status: 200 });
      response.cookies.delete(cookieName);

      return response;
    } catch {
      return NextResponse.json(
        { success: false, message: "Logout failed" },
        { status: 400 },
      );
    }
  }

  async me(request: NextRequest) {
    const authError = await authenticate(request);
    if (authError) return authError;

    const authedRequest = request as AuthenticatedRequest;

    return NextResponse.json(
      {
        id: authedRequest.user.id,
        email: authedRequest.user.email,
        name: authedRequest.user.name,
      },
      { status: 200 },
    );
  }

  async verifyEmail(request: NextRequest) {
    try {
      const body = await request.json();
      const { token } = verifyEmailSchema.parse(body);
      await authService.verifyEmail(token);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Verification failed";
      return NextResponse.json({ success: false, message }, { status: 400 });
    }
  }

  async resendVerification(request: NextRequest) {
    try {
      const body = await request.json();
      const { email } = resendVerificationSchema.parse(body);
      await authService.resendVerification(email);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch {
      return NextResponse.json({ success: false, message: "Request failed" }, { status: 400 });
    }
  }

  async forgotPassword(request: NextRequest) {
    try {
      const body = await request.json();
      const { email } = forgotPasswordSchema.parse(body);
      await authService.forgotPassword(email);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch {
      return NextResponse.json({ success: false, message: "Request failed" }, { status: 400 });
    }
  }

  async resetPassword(request: NextRequest) {
    try {
      const body = await request.json();
      const { token, password } = resetPasswordSchema.parse(body);
      await authService.resetPassword(token, password);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Reset failed";
      return NextResponse.json({ success: false, message }, { status: 400 });
    }
  }
}