document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        message: document.querySelector('textarea[name="message"]').value,
    };

    try {
        const response = await fetch('https://my-portfolio-lc0s.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Email envoyé avec succès !');
        } else {
            alert('Erreur lors de l\'envoi.');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue.');
    }
});