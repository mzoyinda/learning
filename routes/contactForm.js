const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const contactFormRoute = express.Router();

const CLIENT_ID =
  "143944703166-a9654pj9jiocp7qn5mhkmmbje92rb9uo.apps.googleusercontent.com";
const CLIENT_SECRET = "NOia-UZjjDEP_yuvQhd2sgUz";

const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04Fl4hngVeb0xCgYIARAAGAQSNwF-L9Irsec863-DwYJq36FV0QWxPVwNAu7drW9JMYNB9nhMnNgin13BasSdU2565WfKzPfU30E";

// oAuth2 Client

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// Database Connection Route
const databaseConn = require("../models/databaseConn");

//  Middle ware
contactFormRoute.use(databaseConn.handler);

contactFormRoute.post("/contactForm", (req, res) => {
  try {
    // const smtpTrans = nodemailer.createTransport("smtps://contactpyclas%40gmail.com:"+encodeURIComponent('PyClasASOP2020') + "@smtp.gmail.com:465");

    const accessToken = oAuth2Client.getAccessToken();
    const smtpTrans = nodemailer.createTransport({
      service: "Gmail",
      pool: true,
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "contactpyclas@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    // Specify what the email will look like
    const mailOpts = {
      from: `${req.body.name} (${req.body.email})`,
      to: "contactpyclas@gmail.com",
      subject: "New Message From PyClas Contact Form",
      text: ` ${req.body.name} (${req.body.email}) says: ${req.body.message} `,
    };

    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        console.log(error);

        return res.json({
          result: "Not sent",
        });
      } else {
        return res.json({
          result: "Sent successfully!",
        });
      }
    });
  } catch (error) {
    return error;
  }
});

module.exports = contactFormRoute;
