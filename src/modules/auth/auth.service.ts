import bcrypt from "bcryptjs";
import crypto from "crypto";

import { auth } from "@/config/auth";

import { authRepository } from "./auth.repository";
import { authMailer } from "./auth.mailer";
import { AUTH_EVENTS, authEvents } from "./auth.events";
import type { LoginInput, RegisterInput } from "./auth.types";

export const authService = {
  async register(input: RegisterInput) {
    const existingUser = await authRepository.findByEmail(input.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await authRepository.createUser({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    const token = crypto.randomBytes(32).toString("hex");

    await authRepository.createVerificationToken({
      email: user.email,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await authMailer.sendVerificationEmail(user.email, token);

    authEvents.emit(AUTH_EVENTS.USER_REGISTERED, {
      userId: user.id,
      email: user.email,
      token,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
    };
  },

  async login(input: LoginInput) {
    const user = await authRepository.findByEmail(input.email);

    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(input.password, user.password);

    if (!passwordMatches) {
      throw new Error("Invalid email or password");
    }

    const ctx = await auth.$context;
    const session = await ctx.internalAdapter.createSession(user.id);

    authEvents.emit(AUTH_EVENTS.SESSION_CREATED, {
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      session,
    };
  },

  async logout(token: string) {
    const ctx = await auth.$context;
    await ctx.internalAdapter.deleteSession(token);

    authEvents.emit(AUTH_EVENTS.SESSION_DESTROYED, { token });

    return { success: true };
  },

  async verifyEmail(token: string) {
    const record = await authRepository.findVerificationToken(token);

    if (!record || record.expiresAt < new Date()) {
      throw new Error("Invalid or expired token");
    }

    const user = await authRepository.findByEmail(record.email);
    if (!user) {
      throw new Error("User not found");
    }

    await authRepository.markEmailVerified(user.id);
    await authRepository.deleteVerificationToken(token);

    return { success: true };
  },

  async resendVerification(email: string) {
    const user = await authRepository.findByEmail(email);

    if (!user || user.emailVerified) {
      return { success: true };
    }

    const token = crypto.randomBytes(32).toString("hex");

    await authRepository.createVerificationToken({
      email: user.email,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await authMailer.sendVerificationEmail(user.email, token);

    return { success: true };
  },

  async forgotPassword(email: string) {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      return { success: true };
    }

    const token = crypto.randomBytes(32).toString("hex");

    await authRepository.createPasswordResetToken({
      user: { connect: { id: user.id } },
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    await authMailer.sendPasswordResetEmail(user.email, token);

    return { success: true };
  },

  async resetPassword(token: string, newPassword: string) {
    const record = await authRepository.findResetToken(token);

    if (!record || record.used || record.expiresAt < new Date()) {
      throw new Error("Invalid or expired token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await authRepository.updateUserPassword(record.userId, hashedPassword);
    await authRepository.markResetTokenUsed(token);

    return { success: true };
  },
};