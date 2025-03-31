const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://001-amd.github.io');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'amdslm00@gmail.com',
        to: 'amdslm01@gmail.com',
        subject: `Nouveau message de ${name}`,
        text: `De : ${email}\nMessage : ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email envoyé avec succès' });
    } catch (error) {
        console.error('Erreur d’envoi :', error);
        res.status(500).json({ success: false, message: 'Erreur lors de l’envoi de l’email' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));