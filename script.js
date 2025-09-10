// Navegación suave y funcionalidad de la página
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación entre secciones
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Función para cambiar sección activa en navegación
    function setActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Navegación con scroll suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Actualizar navegación activa al hacer scroll
    window.addEventListener('scroll', setActiveNavLink);

    // Funcionalidad de tabs en la sección de características
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clases activas
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            // Mostrar contenido correspondiente
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Animación de números en estadísticas del hero
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/[\d,]/g, '');
            
            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue).toLocaleString() + suffix;
            }, 30);
        });
    }

    // Iniciar animación de números cuando la sección hero sea visible
    const heroSection = document.querySelector('.hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(heroSection);

    // Animación de cards al hacer scroll
    const animatedCards = document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card, .pricing-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    animatedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });



    // Funcionalidad de los botones CTA
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Si no es un enlace, prevenir comportamiento por defecto
            if (this.tagName === 'BUTTON') {
                e.preventDefault();
                
                const buttonText = this.textContent.trim();
                
                if (buttonText.includes('Demo') || buttonText.includes('Ver Demo')) {
                    showNotification('Demo iniciándose... Prepárate para conocer VetekPet', 'info');
                } else if (buttonText.includes('Probar Gratis')) {
                    showNotification('Redirigiendo al registro gratuito...', 'success');
                } else if (buttonText.includes('Agendar')) {
                    showNotification('Abriendo calendario para agendar demo...', 'info');
                }
            }
        });
    });



    // Funcionalidad del video demo (placeholder)
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            showNotification('Video demo cargándose... ¡Próximamente disponible!', 'info');
            
            // Simular carga de video
            this.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <span>Cargando video...</span>
                <p>Un momento por favor</p>
            `;
            
            setTimeout(() => {
                this.innerHTML = `
                    <i class="fas fa-play-circle"></i>
                    <span>Video Demo Interactivo</span>
                    <p>Haz clic para ver cómo VetekPet transforma tu clínica</p>
                `;
            }, 3000);
        });
    }



    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Cerrar notificación
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto cerrar después de 5 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }

    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    function getNotificationColor(type) {
        switch(type) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            default: return '#3b82f6';
        }
    }

    // Funcionalidad del header transparente
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });



    // Funcionalidad interactiva de las tarjetas del hero
    const petCards = document.querySelectorAll('.pet-card');
    petCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const cardText = this.querySelector('span').textContent;
            
            // Crear efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Mostrar información específica según la tarjeta
            let message = '';
            let type = 'info';
            
            if (cardText === 'Max') {
                message = `¡${cardText} es una mascota feliz! Con VetekPet, su salud está siempre monitoreada.`;
                type = 'success';
            } else if (cardText === 'Salud') {
                message = `${cardText}: Mantenemos un registro completo de la salud de tu mascota.`;
                type = 'info';
            } else if (cardText === 'Consulta' || cardText === 'Vacunas' || cardText === 'Tratamiento') {
                message = `${cardText}: Servicios veterinarios profesionales con seguimiento completo.`;
                type = 'info';
            } else if (cardText === 'Cuidado' || cardText === 'Citas') {
                message = `${cardText}: Programamos y recordamos todo lo que tu mascota necesita.`;
                type = 'success';
            } else if (cardText === 'App' || cardText === 'Control') {
                message = `${cardText}: Accede a toda la información desde tu dispositivo móvil.`;
                type = 'info';
            }
            
            if (message) {
                showNotification(message, type);
            }
        });
    });

    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a VetekPet! Haz clic en las tarjetas para explorar nuestras características.', 'success');
    }, 2000);
});

// Estilos CSS para animaciones de notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);

