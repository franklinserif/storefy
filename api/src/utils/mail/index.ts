/**
 * Mailer utlity
 * @module utils/mail
 */

import CONFIG from "../../config/index";
import nodemailer from "nodemailer";
import { IMail } from "index.type";

/**
 * Create reusable transporter object using the default SMTP transport
 */
const transport = nodemailer.createTransport({
  host: CONFIG.NODEMAILER_HOST,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: CONFIG.NODEMAILER_EMAIL_USER,
    pass: CONFIG.NODEMAILER_EMAIL_PASSWORD,
  },
});

/**
 * send mail
 * @async
 * @param {IMail} mail
 */
export default async function sendMail(mail: IMail) {
  // send mail with the default transport object
  await transport.sendMail({
    from: '"Storefy 👻" <franklinserif@gmail.com>', // sender address
    to: mail.to.join(","), // list of receivers
    subject: mail.subject,
    html: `<div style="display: flex; justify-content: center; flex-direction: column"> <h2>${mail.html}</h2>`,
  });
}
