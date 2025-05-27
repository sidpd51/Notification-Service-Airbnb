import { z } from "zod";

const smsPayloadSchema = z.object({
    to: z
        .string()
        .regex(/^\+\d{10,15}$/, "Must be a valid E.164 phone number (e.g., +15551234567)"),
    message: z
        .string()
        .min(1, "Message is required")
        .max(160, "SMS messages should be 160 characters or fewer"),
    senderId: z
        .string()
        .max(11, "Sender ID must be 11 characters or fewer")
        .optional() // common limit for alphanumeric sender IDs
});

export type SmsPayload = z.infer<typeof smsPayloadSchema>;
