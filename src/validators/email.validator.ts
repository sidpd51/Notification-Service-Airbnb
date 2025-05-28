import { z } from "zod";

const templateTypeEnum = z.enum(["WELCOME", "BOOKING"]); // extend as needed

const attachmentSchema = z.object({
    filename: z.string().min(1, "Filename is required"),
    url: z.string().url("Attachment URL must be a valid URL")
});

const userSchema = z.object({
    name: z.string().min(1, "name can't be empty"),
    email: z.string().email()
});


const emailPayloadSchema = z.object({
    to: z.array(userSchema),
    cc: z.array(z.string().email()).optional(),
    bcc: z.array(z.string().email()).optional(),
    subject: z.string().min(1, "Subject is required"),
    orderId: z.string()
        .min(1, "Order ID cannot be empty")
        .regex(/^[a-zA-Z0-9_-]+$/, "Order ID must be alphanumeric with optional dashes or underscores").optional(),
    templateType: templateTypeEnum,
    attachments: z.array(attachmentSchema).optional()
});

export type EmailPayload = z.infer<typeof emailPayloadSchema>;
export type UserSchemaPaylod = z.infer<typeof userSchema>;