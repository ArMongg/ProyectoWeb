document.addEventListener("DOMContentLoaded", () => {

    const imagenes = document.querySelectorAll(".galeria img");

    imagenes.forEach(img => {

        img.addEventListener("click", () => {

            const modal = document.createElement("div");
            modal.classList.add("modal");

            modal.innerHTML = `
                <div class="modal-contenido">
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;

            document.body.appendChild(modal);
            document.body.style.overflow = "hidden";

            function cerrar() {
                modal.classList.add("salir");

                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = "";
                }, 250);
            }

            modal.addEventListener("click", (e) => {
                if (e.target === modal) cerrar();
            });

        });

    });

    const videos = document.querySelectorAll(".media-video");

    videos.forEach(video => {

        video.addEventListener("click", () => {

            const source = video.querySelector("source");

            if (!source) return;

            const src = source.getAttribute("src");

            const modalVideo = document.createElement("div");
            modalVideo.classList.add("modal-video");

            modalVideo.innerHTML = `
                <div class="modal-video-contenido">
                    <video controls autoplay playsinline>
                        <source src="${src}" type="video/mp4">
                        Tu navegador no soporta el video.
                    </video>
                </div>
            `;

            document.body.appendChild(modalVideo);
            document.body.style.overflow = "hidden";

            function cerrarVideo() {
                modalVideo.classList.add("salir");

                setTimeout(() => {
                    modalVideo.remove();
                    document.body.style.overflow = "";
                }, 250);
            }

            modalVideo.addEventListener("click", (e) => {
                if (e.target === modalVideo) cerrarVideo();
            });

        });

    });

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            const modalImg = document.querySelector(".modal");
            const modalVid = document.querySelector(".modal-video");

            if (modalImg) {
                modalImg.classList.add("salir");
                setTimeout(() => modalImg.remove(), 250);
            }

            if (modalVid) {
                modalVid.classList.add("salir");
                setTimeout(() => modalVid.remove(), 250);
            }

            document.body.style.overflow = "";
        }

    });

});






/* ==========================
   MEJORAS FINALES - JAVASCRIPT
========================== */

document.addEventListener("DOMContentLoaded", () => {
    mejorarBeneficios();
    iniciarValidacionFormulario();
    iniciarBotonVolverArriba();
    iniciarMenuActivo();
    iniciarContadorAnimado();
    mejorarAccesibilidadMenu();
});

function mejorarBeneficios() {
    const contenedor = document.getElementById("contenedorBeneficios");
    if (!contenedor) return;

    const nuevosBeneficios = [
        {
            icono:"local_shipping",
            titulo:"Envio Gratis",
            descripcion:"En compras mayores a S/150 realizamos envios gratuitos."
        },
        {
            icono:"verified",
            titulo:"Calidad Garantizada",
            descripcion:"Todas nuestras prendas pasan por un control de calidad."
        },
        {
            icono:"lock",
            titulo:"Pago Seguro",
            descripcion:"Aceptamos diferentes metodos de pago completamente seguros."
        },
        {
            icono:"support_agent",
            titulo:"Atencion Personalizada",
            descripcion:"Nuestro equipo respondera todas tus consultas rapidamente."
        }
    ];

    contenedor.innerHTML = "";

    nuevosBeneficios.forEach((beneficio) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");
        tarjeta.innerHTML = `
            <span class="material-symbols-outlined icono" aria-hidden="true">${beneficio.icono}</span>
            <h3>${beneficio.titulo}</h3>
            <p>${beneficio.descripcion}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function iniciarValidacionFormulario() {
    const formulario = document.getElementById("formulario-contacto");
    if (!formulario) return;

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const nombre = formulario.nombre.value.trim();
        const correo = formulario.correo.value.trim();
        const mensajeExito = document.getElementById("mensaje-exito");
        const esValido = validarFormularioContacto(nombre, correo);

        mensajeExito.textContent = "";

        if (!esValido) return;

        const confirmar = confirm("Estas seguro de enviar tus datos?");

        if (!confirmar) {
            alert("Envio cancelado.");
            mensajeExito.textContent = "Envio cancelado. Puedes revisar tus datos antes de enviarlos.";
            return;
        }

        alert("Gracias " + nombre + ", formulario enviado correctamente.");
        mensajeExito.textContent = "Gracias " + nombre + ", tu mensaje fue enviado correctamente.";
        formulario.reset();
        mostrarInformacion();
    }, true);
}

function validarFormularioContacto(nombre, correo) {
    const errorNombre = document.getElementById("error-nombre");
    const errorCorreo = document.getElementById("error-correo");

    if (!errorNombre || !errorCorreo) {
        return false;
    }
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    let valido = true;

    errorNombre.textContent = "";
    errorCorreo.textContent = "";

    if (nombre.length < 3) {
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
        valido = false;
    }

    if (!correoValido) {
        errorCorreo.textContent = "Ingrese un correo valido, por ejemplo nombre@correo.com.";
        valido = false;
    }

    return valido;
}

function iniciarBotonVolverArriba() {
    const boton = document.getElementById("btn-volver-arriba");
    if (!boton) return;

    window.addEventListener("scroll", () => {
        boton.classList.toggle("visible", window.scrollY > 360);
    });

    boton.addEventListener("click", () => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });
}

function iniciarMenuActivo() {
    const enlaces = document.querySelectorAll(".menu a[href^='#']");
    const secciones = Array.from(enlaces)
        .map((enlace) => document.querySelector(enlace.getAttribute("href")))
        .filter(Boolean);

    if (!("IntersectionObserver" in window) || secciones.length === 0) return;

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;

            enlaces.forEach((enlace) => enlace.classList.remove("activo"));
            const enlaceActivo = document.querySelector(`.menu a[href="#${entrada.target.id}"]`);
            if (enlaceActivo) enlaceActivo.classList.add("activo");
        });
    }, {
        root:null,
        rootMargin:"-40% 0px -45% 0px",
        threshold:0
    });

    secciones.forEach((seccion) => observador.observe(seccion));

    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            const menu = document.getElementById("menu-principal");
            const boton = document.getElementById("btn-hamburguesa");

            menu.classList.remove("activo");
            boton.classList.remove("activo");
            boton.setAttribute("aria-expanded", "false");
        });
    });
}

function iniciarContadorAnimado() {
    const contador = document.querySelector(".contador");
    if (!contador) return;

    const animar = () => {
        const objetivo = Number(contador.dataset.target);
        const duracion = 1400;
        const inicio = performance.now();

        const actualizar = (tiempoActual) => {
            const progreso = Math.min((tiempoActual - inicio) / duracion, 1);
            contador.textContent = Math.floor(progreso * objetivo);

            if (progreso < 1) {
                requestAnimationFrame(actualizar);
            } else {
                contador.textContent = objetivo;
            }
        };

        requestAnimationFrame(actualizar);
    };

    if (!("IntersectionObserver" in window)) {
        animar();
        return;
    }

    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                animar();
                obs.unobserve(entrada.target);
            }
        });
    }, { threshold:.45 });

    observador.observe(contador);
}

function mejorarAccesibilidadMenu() {
    const boton = document.getElementById("btn-hamburguesa");
    if (!boton) return;

    boton.setAttribute("aria-expanded", "false");
}

function menuHamburguesa() {

    const menu = document.getElementById("menu-principal");
    const boton = document.getElementById("btn-hamburguesa");

    if (!menu || !boton) return;

    menu.classList.toggle("activo");
    boton.classList.toggle("activo");

    boton.setAttribute(
        "aria-expanded",
        menu.classList.contains("activo")
    );
}

function mostrarInformacion() {

    const selector = document.getElementById("producto");
    const mensaje = document.getElementById("mensajeProducto");

    if (!selector || !mensaje) return;

    const producto = selector.value;

    const productos = {
        negra: "La Polera Negra es nuestro modelo más vendido y combina con cualquier estilo.",
        blanca: "La Polera Blanca ofrece un diseño limpio y moderno.",
        roja: "La Polera Roja destaca por su estilo urbano y llamativo.",
        azul: "La Polera Azul es ideal para un look casual.",
        oversize: "La Polera Oversize brinda mayor comodidad y un estilo moderno."
    };

    mensaje.textContent =
        productos[producto] ||
        "Seleccione una polera para ver su información.";
}
