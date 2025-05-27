import { z } from "zod";

const templateTypeEnum = z.enum(["WELCOME", "PASSWORD_RESET", "INVOICE", "CUSTOM"]); // extend as needed

const attachmentSchema = z.object({
    filename: z.string().min(1, "Filename is required"),
    url: z.string().url("Attachment URL must be a valid URL")
});


const emailPayloadSchema = z.object({
    to: z.array(z.string().email()).min(1, "'to' must contain at least one email"),
    cc: z.array(z.string().email()).optional(),
    bcc: z.array(z.string().email()).optional(),
    subject: z.string().min(1, "Subject is required"),
    templateType: templateTypeEnum,
    attachments: z.array(attachmentSchema).optional()
});

export type EmailPayload = z.infer<typeof emailPayloadSchema>;