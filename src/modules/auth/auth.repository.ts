import { Prisma } from "@prisma/client";
import { prisma } from "@/config/database";

export const authRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },

  createVerificationToken(data: Prisma.VerificationTokenCreateInput) {
    return prisma.verificationToken.create({ data });
  },

  findVerificationToken(token: string) {
    return prisma.verificationToken.findUnique({ where: { token } });
  },

  deleteVerificationToken(token: string) {
    return prisma.verificationToken.delete({ where: { token } });
  },

  markEmailVerified(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });
  },

  updateUserPassword(userId: string, password: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { password },
    });
  },

  createPasswordResetToken(data: Prisma.PasswordResetTokenCreateInput) {
    return prisma.passwordResetToken.create({ data });
  },

  findResetToken(token: string) {
    return prisma.passwordResetToken.findUnique({ where: { token } });
  },

  markResetTokenUsed(token: string) {
    return prisma.passwordResetToken.update({
      where: { token },
      data: { used: true },
    });
  },
};