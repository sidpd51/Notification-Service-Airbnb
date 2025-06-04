import { z } from "zod";

const templateTypeEnum = z.enum(["welcome", "booking"]);


const paramsSchema = z.record(z.string(), z.any());

export const emailPayloadSchema = z.object({
    to: z.string().email("Invalid recipient email"), 
    subject: z.string().min(1, "Subject is required"),
    template: templateTypeEnum, 
    params: paramsSchema.optional(), // Accept any key-value pairs
});
