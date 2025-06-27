import status from 'http-status';
import nodemailer from 'nodemailer';
import config from '../config';
import AppError from './AppError';

const sendOtpEmail = async (email: string, otp: string, fullName: string) => {
  try {
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.nodemailer.email,
        pass: config.nodemailer.password,
      },
    });

    // Email HTML template with dynamic placeholders
    const htmlTemplate = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                color: #222;
              }
              .container {
                max-width: 600px;
                margin: 30px auto;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 6px 20px rgba(0,0,0,0.1);
                overflow: hidden;
                border-top: 6px solid #D8F77C; /* deep green */
              }
              .header {
                text-align: center;
                padding: 25px 20px 10px;
                background:rgba(216, 247, 124, 0.51);
                border-bottom: 1px solid rgb(153, 204, 0);
              }
              .header img {
                max-width: 120px;
                margin-bottom: 10px;
              }
              .header h1 {
                font-size: 26px;
                color:rgb(0, 85, 35);
                margin: 0 0 6px;
                font-weight: 700;
                letter-spacing: 1.2px;
                font-family: 'Georgia', serif;
              }
              .header p {
                font-size: 14px;
                color: #4a4a4a;
                margin: 0;
                font-style: italic;
              }
              .content {
                padding: 25px 30px;
                font-size: 16px;
                line-height: 1.6;
                color: #444;
              }
              .content p {
                margin: 15px 0;
              }
              .otp {
                margin: 30px auto;
                border-left: 6px solid rgb(153, 204, 0);
                background: linear-gradient(135deg,rgba(255, 230, 153, 0.32),rgba(157, 242, 192, 0.26));
                color: #262626;
                font-size: 32px;
                font-weight: 700;
                padding: 15px 30px;
                border-radius: 8px;
                font-family: 'Courier New', Courier, monospace;
                letter-spacing: 8px;
                user-select: all;
                box-shadow: 0 4px 15px rgba(185, 171, 141, 0.6);
                text-align: center;
              }
              .footer {
                background:rgba(181, 224, 255, 0.32);
                text-align: center;
                font-size: 12px;
                color: #777;
                padding: 15px 20px;
                border-top: 1px solid rgb(80, 182, 255);
                font-style: italic;
              }
              @media (max-width: 600px) {
                .container {
                  margin: 15px;
                  width: 90%;
                }
                .header h1 {
                  font-size: 22px;
                }
                .otp {
                  font-size: 24px;
                  padding: 12px 24px;
                  letter-spacing: 6px;
                }
                .content {
                  padding: 20px 15px;
                  font-size: 15px;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Crescent Change</h1>
                <p>Empowering your charitable journey</p>
              </div>
              <div class="content">
                <p>Assalamu Alaikum ${fullName},</p>
                <p>Thank you for choosing <strong>Crescent Change</strong> to make a difference. To confirm your recent donation and secure your account, please use the one-time password (OTP) below:</p>
                <div class="otp">${otp}</div>
                <p>This OTP is valid for 5 minutes. Please enter it promptly to complete your verification.</p>
                <p>May Allah bless your generosity and multiply your rewards.</p>
              </div>
              <div class="footer">
                <p>If you did not initiate this request, kindly ignore this email or contact support.</p>
                <p>© 2025 Crescent Change. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
  `;

    // <img src="cid:steady_hands_logo" alt="Steady Hands Logo">

    // Email options: from, to, subject, and HTML body
    const mailOptions = {
      from: config.nodemailer.email, // Sender's email address
      to: email, // Recipient's email address
      subject: 'Your OTP for Account Verification',
      html: htmlTemplate,
    };

    // Send the email using Nodemailer
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new AppError(status.INTERNAL_SERVER_ERROR, 'Failed to send email');
  }
};

export default sendOtpEmail;
