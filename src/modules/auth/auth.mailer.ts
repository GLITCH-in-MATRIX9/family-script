export const authMailer = {
  async sendVerificationEmail(email: string, token: string) {
    console.info(`[mailer] verify-email link for ${email}: /verify-email?token=${token}`);
  },
  async sendPasswordResetEmail(email: string, token: string) {
    console.info(`[mailer] reset-password link for ${email}: /reset-password?token=${token}`);
  },
};