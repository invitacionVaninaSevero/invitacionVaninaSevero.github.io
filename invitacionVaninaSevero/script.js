// Fecha del evento (año, mes [0-11], día, hora, minuto)
const eventDate = new Date(2025, 4, 17, 21, 0, 0);

// Función para actualizar el contador
function updateCountdown() {
    const now = new Date();
    const difference = eventDate - now;

    // Si la fecha ya pasó
    if (difference <= 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? `0${days}` : days;
    document.getElementById("hours").innerText = hours < 10 ? `0${hours}` : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;
}

// Actualizar el contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();

// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuToggle.addEventListener("click", () => {
    mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block";
    menuToggle.innerHTML =
        mobileNav.style.display === "block" ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mobileNav.style.display = "none";
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Mostrar/ocultar campo de número de invitados según asistencia
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
const guestsGroup = document.getElementById("guestsGroup");

attendanceRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
        if (e.target.value === "yes") {
            guestsGroup.style.display = "block";
        } else {
            guestsGroup.style.display = "none";
        }
    });
});

// Formulario RSVP
const rsvpForm = document.getElementById("rsvpForm");
const toast = document.getElementById("toast");
const toastClose = document.getElementById("toastClose");

rsvpForm.addEventListener("submit", async (e) => { // Añadir 'async'
    e.preventDefault();

    // Recopilar datos del formulario
    const formData = new FormData(rsvpForm);

    // **DEBUGGING - INSPECT FORMDATA**
    console.log("formData entries:");
    for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
    // **END DEBUGGING**

    try {
        // Enviar datos al worker
        const workerURL = rsvpForm.action; // Obtener la URL del atributo 'action'
        const response = await fetch(workerURL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text(); // Obtener el mensaje de error del worker
            console.error('Error del worker:', errorText);
            alert(`Error: ${errorText}`); // Mostrar el error en un alert
            return;
        }

        const data = await response.json();
        console.log('Respuesta del worker:', data);

        // Mostrar toast
        toast.classList.add("show");

        // Ocultar toast después de 5 segundos
        setTimeout(() => {
            toast.classList.remove("show");
        }, 5000);

        // Resetear formulario
        rsvpForm.reset();

    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error al enviar la información. Por favor, intenta de nuevo.');
    }
});

// Cerrar toast al hacer clic en el botón de cerrar
toastClose.addEventListener("click", () => {
    toast.classList.remove("show");
});

// Actualizar año en el footer
document.getElementById("currentYear").innerText = new Date().getFullYear();

// Añadir al final de script.js
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const hero = document.querySelector(".hero");
    const headerHeight = header.offsetHeight; // Obtiene la altura del header
    hero.style.paddingTop = `${headerHeight + 20}px`; // Añade un poco de margen extra
});

// Animación de desplazamiento de secciones
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".hero, .invitation, .details, .gallery, .rsvp, .gifts");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
});

// Efectos de sonido para interacciones
function playHoverSound() {
    const audio = new Audio("hover-sound.mp3");
    audio.volume = 0.2;
    audio.play().catch(e => {
        // Silenciar errores de reproducción automática
        console.log("Reproducción automática bloqueada por el navegador");
    });
}

// Añadir eventos de sonido a elementos interactivos
document.addEventListener("DOMContentLoaded", () => {
    const interactiveElements = document.querySelectorAll("a, button, .gift-card");

    interactiveElements.forEach((element) => {
        element.addEventListener("mouseover", () => {
            // Comentado para evitar errores de reproducción automática
            // playHoverSound();
        });
    });
});

// Animación de texto de bienvenida
function typeWriterEffect() {
    const quote = document.querySelector(".quote");
    if (quote) {
        const text = quote.textContent;
        quote.textContent = "";
        let index = 0;

        function type() {
            if (index < text.length) {
                quote.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }

        type();
    }
}

// Llamar a efectos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    typeWriterEffect();
});

/* INICIO - Script de la Mariposa */
document.addEventListener("DOMContentLoaded", () => {
    const butterfly = document.getElementById("butterfly");
    if (!butterfly) return;

    // Posición inicial aleatoria
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    // Velocidad y dirección
    let dx = (Math.random() * 2 - 1) * 2;
    let dy = (Math.random() * 2 - 1) * 2;

    // Tiempo para cambiar de dirección
    let changeDirectionTime = 0;

    // Iniciar la animación del sprite
    butterfly.style.animation = "flutter 0.8s steps(1) infinite";

    function updatePosition() {
        // Cambiar dirección aleatoriamente
        changeDirectionTime++;
        if (changeDirectionTime > 100) {
            if (Math.random() < 0.1) {
                dx = (Math.random() * 2 - 1) * 2;
                dy = (Math.random() * 2 - 1) * 2;
                changeDirectionTime = 0;
            }
        }

        // Actualizar posición
        x += dx;
        y += dy;

        // Mantener dentro de los límites de la ventana
        if (x < 0) {
            x = 0;
            dx = -dx;
        }
        if (x > window.innerWidth - 64) {
            x = window.innerWidth - 64;
            dx = -dx;
        }
        if (y < 0) {
            y = 0;
            dy = -dy;
        }
        if (y > window.innerHeight - 64) {
            y = window.innerHeight - 64;
            dy = -dy;
        }

        // Aplicar la posición
        butterfly.style.left = x + "px";
        butterfly.style.top = y + "px";

        // Voltear horizontalmente según la dirección
        if (dx < 0) {
            butterfly.style.transform = "scaleX(-1)";
        } else {
            butterfly.style.transform = "scaleX(1)";
        }

        requestAnimationFrame(updatePosition);
    }

    // Iniciar la animación de movimiento
    updatePosition();

    // Ajustar cuando cambia el tamaño de la ventana
    window.addEventListener("resize", () => {
        // Asegurarse de que la mariposa permanezca dentro de la ventana
        if (x > window.innerWidth - 64) x = window.innerWidth - 64;
        if (y > window.innerHeight - 64) y = window.innerHeight - 64;
    });

    // Inhabilitar interacciones con la mariposa
    butterfly.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado al hacer clic
    });

    butterfly.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado al tocar
    });
});
/* FIN - Script de la Mariposa */