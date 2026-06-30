import { Prisma } from "@prisma/client";
import { prisma } from "../../config/database";

export const authRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  },

  createVerificationToken(data: Prisma.VerificationCreateInput) {
    return prisma.verification.create({
      data,
    });
  },

  findVerificationToken(token: string) {
    return prisma.verification.findUnique({
      where: { token },
    });
  },

  createPasswordResetToken(data: Prisma.PasswordResetCreateInput) {
    return prisma.passwordReset.create({
      data,
    });
  },

  findResetToken(token: string) {
    return prisma.passwordReset.findUnique({
      where: { token },
    });
  },

  markResetTokenUsed(token: string) {
    return prisma.passwordReset.update({
      where: { token },
      data: { usedAt: new Date() },
    });
  },
};