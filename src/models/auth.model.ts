import { z } from 'zod';

// validate number phone
export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^0\d{9}$/, 'Invalid Vietnamese phone number format'),
});

export const verifyCodeSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number is too short'),
  accessCode: z.string().length(6, 'Access code must be 6 digits'),
});

export type PhoneInput = z.infer<typeof phoneSchema>;

export interface AccessCodeRecord {
    phoneNumber: string;
    accessCode: string;
    updateAt: number;
  }
  
