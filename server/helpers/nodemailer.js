const nodemailer = require("nodemailer");

const sendEmailRegis = {
  sendEmail: async (email, uniqueString) => {
    console.log("luar try");
    try {
      console.log("dalam try");
      const transTest = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "nihonolive@gmail.com", // generated ethereal user
          pass: process.env.NODEMAILER_KEY, // generated ethereal password
        },
      };
      const transDev = {
        host: "smtp.gmail.email",
        port: 465,
        service: "gmail",
        secure: true,
        auth: {
          user: "nihonolive@gmail.com",
          pass: process.env.NODEMAILER_KEY,
        },
        tls: {
          rejectUnauthorized: false,
        },
        debug: true,
        logger: true,
      };
      const transporter = nodemailer.createTransport(
        process.env.NODE_ENV === "test" ? transTest : transDev
      );

      const option = {
        from: "nihonolive@gmail.com",
        to: email,
        subject: "Email Confirmation",
        html: `
        <center>
        <img src="https://ik.imagekit.io/ftti7xeyu/Final/verif_img2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675837980143" width=500">
        <div style="margin-top: 30px; font-size: large;">
        Click <a href = http://122.248.218.60/users/verify/${uniqueString}> here </a> to verify
        </div>
        </center>`,
      };

      // // // return new Promise((resolve, reject) => {
      // // await transporter.sendMail(option, (err, info) => {
      // //   console.log(info.envelope);
      // //   console.log(info.messageId);
      // //   // if (err) {
      // //   //   console.log(err);
      // //   //   reject(err);
      // //   // }
      // //   // resolve("success");
      // //   // console.log("sent: " + info);
      // // });
      // // // });
      // // return "Success"
      let info = await transporter.sendMail(option);
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {}
  },
};

module.exports = sendEmailRegis;
