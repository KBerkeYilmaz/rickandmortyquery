import  { type NextRequest, NextResponse } from "next/server";
import type { EmailRequestData } from "@/lib/types/mailTypes";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, name, message } = (await request.json()) as EmailRequestData;

  console.log(email, name, message);
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: process.env.APP_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = (): Promise<string> =>
    new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });
  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
