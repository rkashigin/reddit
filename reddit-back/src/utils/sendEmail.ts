import nodemailer from "nodemailer";


export async function sendEmail(to: string, html: string) {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log('TEST ACCOUNt', testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: 'cjcan7jsgunbmbns@ethereal.email',
      pass: 'x6prdvGSV6UJBNzvx3',
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    subject: "Hello ✔",
    to,
    html
  });

  console.log("Message sent: %s", info.messageId);



  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}