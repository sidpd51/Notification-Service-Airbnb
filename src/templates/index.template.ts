import Handlebars from "handlebars";

export const bookingTemplate = Handlebars.compile(`
    < p > Dear {{ name }}, </>
    < p > We are pleased to confirm that your order < strong >#{ { orderId } } </> has been successfully booked.</p >
    <p>Thank you for choosing our services.If you have any questions or need further assistance, please do not hesitate to contact us.</p>
    < p > Best regards, </>
    < p > <strong>The Airbnb Team < /strong></p >
`);


export const welcomeTemplate = Handlebars.compile(`
    <p>Dear {{name}},</p>

    <p>Welcome to Airbnb!</p>

    <p>We’re excited to have you on board. Whether you're planning your next getaway or looking to host, we’re here to help you every step of the way.</p>

    <p>If you have any questions, feel free to reach out to our support team anytime.</p>

    <p>Best regards,</p>
    <p><strong>The Airbnb Team</strong></p>
`);

