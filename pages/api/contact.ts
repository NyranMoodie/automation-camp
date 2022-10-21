// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer, { Transporter } from "nodemailer";
type Data = {
  name: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let transporter: Transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const formData = req.body as unknown as FormData;
  const mailData = {
    from: process.env.EMAIL_USERNAME,
    to: "nyranmoodie@gmail.com",
    subject: `${formData.subject}`,
    html: `<div> NAME : ${
      formData.firstName + " " + formData.lastName
    }</div><p>Sent from:
      ${formData.email}</p>
     MESSAGE : <p>${formData.message}</p>`,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.status(200);
  res.status(200).json({ name: "John Doe" });
}
