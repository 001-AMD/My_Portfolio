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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Email envoyé avec succès !');
        } else {
            alert(`Erreur : ${result.message || 'Échec de l\'envoi'}`);
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Une erreur réseau est survenue.');
    }
});
