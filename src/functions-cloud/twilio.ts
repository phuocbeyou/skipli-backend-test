import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromPhone = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export async function sendOTPBySMS(toPhone: string, otp: string): Promise<void> {
  await client.messages.create({
    body: `Your verification code is: ${otp}`,
    from: fromPhone,
    to: toPhone,
  });
}
