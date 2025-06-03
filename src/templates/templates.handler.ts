import path from "path";
import fs from 'fs/promises';
import { NotFoundError } from "../utils/errors/app.error";
import Handlebars from "handlebars";

export async function renderMailerTemplates(templateId: string, params: Record<string, any>): Promise<string> {
    const templatePath = path.join(__dirname, 'mailer', `${templateId}.hbs`)
    try {
        const content = await fs.readFile(templatePath, 'utf-8');
        const finalContent = Handlebars.compile(content);
        return finalContent(params);
    } catch (error) {
        throw new NotFoundError(`Template not found: ${templateId}`);
    }
}