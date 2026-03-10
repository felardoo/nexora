
// Función para mostrar el pop-up de cookies
function showCookieConsent() {
    let cookieConsent = document.getElementById('cookie-consent');
    if (!localStorage.getItem('cookieAccepted')) {
        cookieConsent.style.display = 'flex';
    }
}

// Función para aceptar cookies
function acceptCookies() {
    localStorage.setItem('cookieAccepted', 'true');
    document.getElementById('cookie-consent').style.display = 'none';
}

// Función para denegar cookies (opcional, si se quiere ofrecer una opción de denegación con funcionalidad limitada)
function denyCookies() {
    localStorage.setItem('cookieAccepted', 'false'); // O 'denied'
    document.getElementById('cookie-consent').style.display = 'none';
    // Aquí podrías añadir lógica para deshabilitar funcionalidades que dependan de cookies no esenciales
}

// Función para mostrar pop-ups de contenido legal
function showLegalPopup(title, content) {
    let modal = document.getElementById('legal-modal');
    let modalTitle = document.getElementById('legal-modal-title');
    let modalContent = document.getElementById('legal-modal-content');

    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modal.style.display = 'flex';
}

// Función para cerrar pop-ups de contenido legal
function closeLegalPopup() {
    document.getElementById('legal-modal').style.display = 'none';
}

// Event Listeners para los botones de cookies
document.addEventListener('DOMContentLoaded', () => {
    showCookieConsent();

    let acceptBtn = document.getElementById('accept-cookies');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptCookies);
    }

    let denyBtn = document.getElementById('deny-cookies');
    if (denyBtn) {
        denyBtn.addEventListener('click', denyCookies);
    }

    // Event Listener para cerrar el modal legal
    let closeLegalModalBtn = document.querySelector('#legal-modal .close-button');
    if (closeLegalModalBtn) {
        closeLegalModalBtn.addEventListener('click', closeLegalPopup);
    }

    // Cargar contenido legal y asignar eventos a los enlaces
    const legalLinks = {
        'terminos-y-condiciones': '/home/ubuntu/legal_content/terminos_y_condiciones.md',
        'politica-de-privacidad': '/home/ubuntu/legal_content/politica_de_privacidad.md',
        'politica-de-cookies': '/home/ubuntu/legal_content/politica_de_cookies.md',
        'aviso-legal': '/home/ubuntu/legal_content/aviso_legal.md'
    };

    for (const [id, path] of Object.entries(legalLinks)) {
        const linkElement = document.getElementById(id);
        if (linkElement) {
            linkElement.addEventListener('click', (e) => {
                e.preventDefault();
                fetch(path)
                    .then(response => response.text())
                    .then(markdown => {
                        // Convertir Markdown a HTML (simplificado, para un caso real se usaría una librería)
                        const converter = new showdown.Converter(); // Asumiendo que showdown.js está cargado
                        const htmlContent = converter.makeHtml(markdown);
                        showLegalPopup(e.target.textContent, htmlContent);
                    })
                    .catch(error => console.error('Error al cargar el contenido legal:', error));
            });
        }
    }
});
