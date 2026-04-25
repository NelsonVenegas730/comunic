function cargarPagina(nombrePagina) {
    const app = document.getElementById('app');
    const paginas = {
        'inicio': 'inicio.html',
        'nosotros': 'nosotros.html',
        'carreras': 'carreras.html',
        'cursos': 'cursos.html',
        'blog': 'blog.html',
        'faq': 'faq.html',
        'contacto': 'contacto.html',
        'matricula': 'matricula.html',
        'anuncios': 'anuncios.html'
    };

    if (paginas[nombrePagina]) {
        fetch(paginas[nombrePagina])
            .then(response => response.text())
            .then(html => {
                app.innerHTML = html;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                inicializarPagina();
            })
            .catch(error => console.error('Error al cargar la página:', error));
    }
}


function inicializarPagina() {
    observeFadeIn();

    // Reinicializar Bootstrap (si es necesario para carousels, etc.)
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        new bootstrap.Carousel(carousel);
    });
}


function observeFadeIn() {
    const els = document.querySelectorAll('.fade-in-up');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 80);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => { if (!el.classList.contains('visible')) obs.observe(el); });
}

function enviarSuscripcion(e) {
    e.preventDefault();
    const email = document.getElementById('emailSus').value.trim();
    const msg = document.getElementById('msgSus');
    if (!email) return;
    msg.textContent = '✅ ¡Gracias! Te has suscrito con éxito a nuestro boletín.';
    msg.style.display = 'block';
    document.getElementById('formSuscripcion').reset();
}

function enviarContacto(e) {
    e.preventDefault();
    const form = document.getElementById('formContacto');
    const msg = document.getElementById('msgContacto');
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
    msg.innerHTML = '<div style="background:#E8F8ED; border:2px solid #2DA050; border-radius:10px; padding:1rem; color:#145A28; font-family:\'Sora\',sans-serif; font-weight:600;">✅ ¡Mensaje enviado con éxito! Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.</div>';
    msg.style.display = 'block';
    form.reset();
    form.classList.remove('was-validated');
}

function enviarMatricula(e) {
    e.preventDefault();
    const form = document.getElementById('formMatricula');
    const msg = document.getElementById('msgMatricula');
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
    const nombre = document.getElementById('mNombre').value;
    msg.innerHTML = `<div style="background:#E8F8ED; border:2px solid #2DA050; border-radius:10px; padding:1.2rem; color:#145A28; font-family:'Sora',sans-serif; font-weight:600;">🎉 ¡Solicitud enviada, ${nombre}! Hemos recibido tu interés de matrícula. Te contactaremos al correo registrado en menos de 24 horas para completar el proceso.</div>`;
    msg.style.display = 'block';
    form.reset();
    form.classList.remove('was-validated');
    window.scrollTo({ top: document.getElementById('msgMatricula').getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
}


const programasPorTipo = {
    carrera: ['Diseño Gráfico Digital', 'Programación de Computadoras', 'Operador de Computadoras', 'Excel Paso a Paso'],
    libre: ['Excel Básico', 'Excel Intermedio', 'Excel Avanzado', 'Word Básico', 'PowerPoint Básico', 'Windows', 'Internet', 'Digitación Avanzada'],
    especializado: ['Access Básico', 'Access Avanzado', 'Excel Macros', 'Excel Tablas Dinámicas', 'Excel Financiero', 'Excel Estadístico', 'Project Básico', 'Project Avanzado', 'Word Avanzado', 'Power BI'],
    empresarial: ['Capacitación Corporativa a la Medida', 'Plan Empresarial Ilimitado']
};

function actualizarCursos() {
    const tipo = document.getElementById('mTipo').value;
    const sel = document.getElementById('mPrograma');
    sel.innerHTML = '<option value="">Seleccionar programa</option>';
    if (programasPorTipo[tipo]) {
        programasPorTipo[tipo].forEach(p => {
            const o = document.createElement('option');
            o.textContent = p;
            o.value = p;
            sel.appendChild(o);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    cargarPagina('inicio');
});