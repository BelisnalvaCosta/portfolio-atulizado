// ============================================
// FORM CONTACT HANDLER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit();
        });
    }

    // Smooth scroll behavior for links
    setupSmoothScroll();

    // Add animations on scroll
    setupScrollAnimations();
});

// ============================================
// HANDLE CONTACT FORM SUBMISSION
// ============================================
function handleContactFormSubmit() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validate inputs
    if (!nome || !email || !mensagem) {
        showNotification('Por favor, preencha todos os campos!', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Por favor, digite um e-mail válido!', 'error');
        return;
    }

    // Format message for WhatsApp
    const mensagemFormatada = formatMessageForWhatsApp(nome, email, mensagem);
    
    // Send to WhatsApp
    sendToWhatsApp(mensagemFormatada);
}

// ============================================
// FORMAT MESSAGE FOR WHATSAPP
// ============================================
function formatMessageForWhatsApp(nome, email, mensagem) {
    const texto = `*Novo Contato do Portfólio*%0A%0A` +
        `*Nome:* ${encodeURIComponent(nome)}%0A` +
        `*E-mail:* ${encodeURIComponent(email)}%0A%0A` +
        `*Mensagem:*%0A${encodeURIComponent(mensagem)}`;
    return texto;
}

// ============================================
// SEND TO WHATSAPP
// ============================================
function sendToWhatsApp(mensagem) {
    // Replace with your WhatsApp number (with country code, without + or spaces)
    const numeroWhatsApp = '5598984423154'; // Brazil format: 55 + area code + number
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    
    // Open WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    // Show success message and reset form
    showNotification('Redirecionando para WhatsApp...', 'success');
    resetForm();
}

// ============================================
// VALIDATE EMAIL
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// RESET FORM
// ============================================
function resetForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        setTimeout(() => {
            form.reset();
        }, 500);
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        margin: 0;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ============================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('section, .projects-card, .projects-card-article').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// ADD ANIMATION KEYFRAMES DYNAMICALLY
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);    