export default async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message, email, paypal } = req.body;

    const mailOptions = {
        to: '0dxp.inc@gmail.com',
        subject: 'New Submission from FREE MONEY FORM',
        text: `Message: ${message}\nEmail: ${email}\nPayPal: ${paypal}`,
    };

    try {
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer YOUR_RESEND_API_KEY`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mailOptions),
        });

        res.status(200).json({ success: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending email.' });
    }
}
