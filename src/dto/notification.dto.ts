export type NotificationDto = {
    to: string;
    subject: string;
    template: string;
    params: Record<string, any>;
}