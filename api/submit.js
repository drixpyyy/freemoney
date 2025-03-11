// api/submit.js
const fs = require('fs');
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, paypal } = req.body;

        // Load existing submissions
        const data = JSON.parse(fs.readFileSync('./submissions.json', 'utf8'));

        // Check if the email already exists
        if (data.includes(email)) {
            return res.status(400).json({ message: 'You have already submitted your details.' });
        }

        // Add the new email to the submission list
        data.push(email);
        fs.writeFileSync('./submissions.json', JSON.stringify(data));

        // Create a transporter object using SMTP service
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password', // Or use OAuth2
            },
        });

        // Define the email options
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: '0dxp.inc@gmail.com',
            subject: 'New Payment Request',
            text: `Email: ${email}\nPayPal: ${paypal}`,
        };

        // Send the email
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Your form has been successfully submitted. Please allow 2-3 business days for processing.' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
