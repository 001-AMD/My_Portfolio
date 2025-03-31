const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: 'https://001-amd.github.io/My_Portfolio/' }));

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'amdslm00@gmail.com', // Ton adresse Gmail
        pass: 'zfmqzwrlkhckhhvz', // Mot de passe d'application Gmail
    },
});

// Route pour envoyer un email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'amdslm02@gmail.com',
        subject: `Nouveau message de ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erreur lors de l\'envoi de l\'email');
        } else {
            console.log('Email envoyé: ' + info.response);
            res.status(200).send('Email envoyé avec succès');
        }
    });
});

// Port dynamique pour l’hébergement
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});