const nodemailer = require("nodemailer");

const sendEmailObj = {
  sendEmailSubs: async (email) => {
    try {
      const transTest = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "nihonolive@gmail.com",
          pass: process.env.NODEMAILER_KEY,
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

      const option2 = {
        from: "nihonolive@gmail.com",
        to: email,
        subject: "Success Subscribe",
        html: `
        <center>
        <img src="https://ik.imagekit.io/ftti7xeyu/Final/NodeMailerIMG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675755629074" width=500">
        </center>
        <div style="color: black; margin-top: 50px;">
        <h3>Dear valued member of Nihon No Live,</h3>
        <p>
            Sebagai anggota baru kami, kami ingin mengucapkan selamat datang dan terima kasih atas kepercayaan Anda pada
            Nihon No
            Live. Kami sangat senang bahwa Anda memilih untuk bergabung dengan komunitas kami dan berpartisipasi dalam dunia
            VTuber bersama kami.
            Dengan menjadi anggota, Anda akan memiliki akses ke berbagai manfaat eksklusif seperti konten terbaru dari
            VTuber
            kami, diskon dan promosi spesial, serta kesempatan untuk berinteraksi dan berpartisipasi dalam acara-acara
            khusus.
            Kami berharap bahwa Anda akan menikmati waktu bersama kami dan terus berkontribusi dalam komunitas Nihon No
            Live.
            Kami sangat menghargai dan menantikan kemitraan yang baik dengan Anda.
        </p>
        <h4>Salam hangat,</h4>
        <p>Tim Nihon No Live</p>
    </div>
       
        `,
      };
      let info = await transporter.sendMail(option2);
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {}
  },
};

module.exports = sendEmailObj;
