import { saveAccessCode } from '../services/access-code.service';
import { generateOTP } from '@utils/otp-helper';
import { sendOTPBySMS } from '../functions-cloud/twilio';

export async function createAccessCodeForPhone(phoneNumber: string): Promise<string> {
  const accessCode = generateOTP();
  await saveAccessCode(phoneNumber, accessCode);
  await sendOTPBySMS(phoneNumber, accessCode);
  return accessCode;
}
