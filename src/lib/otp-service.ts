export class OTPService {
  private static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static createOTP(email: string): string {
    const otp = this.generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Store OTP in sessionStorage with expiry
    sessionStorage.setItem('otp_data', JSON.stringify({
      code: otp,
      email,
      expiry: expiryTime
    }));

    return otp;
  }

  static verifyOTP(code: string): boolean {
    const otpData = sessionStorage.getItem('otp_data');
    if (!otpData) return false;

    const { code: storedCode, expiry } = JSON.parse(otpData);
    const isValid = code === storedCode && Date.now() < expiry;

    if (isValid) {
      sessionStorage.removeItem('otp_data');
    }

    return isValid;
  }
}
