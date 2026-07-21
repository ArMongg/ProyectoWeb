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

            const src = video.querySelector("source").src;

            const modalVideo = document.createElement("div");
            modalVideo.classList.add("modal-video");

            modalVideo.innerHTML = `
                <div class="modal-video-contenido">
                    <video src="${src}" controls autoplay></video>
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

const formularioAntiguo = document.querySelector("form");

// Manejador anterior desactivado; la validacion final se encuentra mas abajo.
if (false && formularioAntiguo) formularioAntiguo.addEventListener("submit", (e) => {

    e.preventDefault();

    const confirmar = false;

    if (confirmar) {

        const nombreUsuario = "";

        if (nombreUsuario) {
            alert("Gracias " + nombreUsuario + ", formulario enviado!");
        } else {
            alert("No escribiste tu nombre.");
        }

    } else {
        alert("Envio cancelado.");
    }

});



const beneficios = [

{
    icono:"local_shipping",
    titulo:"Envío Gratis",
    descripcion:"En compras mayores a S/150 realizamos envíos gratuitos."
},

{
    icono:"verified",
    titulo:"Calidad Garantizada",
    descripcion:"Todas nuestras prendas pasan por un control de calidad."
},

{
    icono:"lock",
    titulo:"Pago Seguro",
    descripcion:"Aceptamos diferentes métodos de pago completamente seguros."
},

{
    icono:"support_agent",
    titulo:"Atención Personalizada",
    descripcion:"Nuestro equipo responderá todas tus consultas rápidamente."
}

];

const contenedor = document.getElementById("contenedorBeneficios");

for(let i=0; i<beneficios.length; i++){

    const tarjeta = document.createElement("div");

    tarjeta.classList.add("card");

    tarjeta.innerHTML = `
    <span class="material-symbols-outlined icono">
        ${beneficios[i].icono}
    </span>

    <h3>${beneficios[i].titulo}</h3>

    <p>${beneficios[i].descripcion}</p>
`;

    contenedor.appendChild(tarjeta);

}

//MENU HAMBURGUESA
function menuHamburguesa() {
    const menu = document.getElementById('menu-principal');
    menu.classList.toggle('activo');
}


function mostrarInformacion(){

    const producto = document.getElementById("producto").value;

    const mensaje = document.getElementById("mensajeProducto");

    switch(producto){

        case "negra":

            mensaje.innerHTML =
            "La Polera Negra es nuestro modelo más vendido y combina con cualquier estilo.";

            break;

        case "blanca":

            mensaje.innerHTML =
            "La Polera Blanca ofrece un diseño limpio y moderno.";

            break;

        case "roja":

            mensaje.innerHTML =
            "La Polera Roja destaca por su estilo urbano y llamativo.";

            break;

        case "azul":

            mensaje.innerHTML =
            "La Polera Azul es ideal para un look casual.";

            break;

        case "oversize":

            mensaje.innerHTML =
            "La Polera Oversize brinda mayor comodidad y un estilo moderno.";

            break;

        default:

            mensaje.innerHTML =
            "Seleccione una polera para ver su información.";

    }

}

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
            mensajeExito.textContent = "Envio cancelado. Puedes revisar tus datos antes de enviarlos.";
            return;
        }

        mensajeExito.textContent = "Gracias " + nombre + ", tu mensaje fue enviado correctamente.";
        formulario.reset();
        mostrarInformacion();
    }, true);
}

function validarFormularioContacto(nombre, correo) {
    const errorNombre = document.getElementById("error-nombre");
    const errorCorreo = document.getElementById("error-correo");
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

    menu.classList.toggle("activo");
    boton.classList.toggle("activo");
    boton.setAttribute("aria-expanded", menu.classList.contains("activo"));
}

function mostrarInformacion() {
    const producto = document.getElementById("producto").value;
    const mensaje = document.getElementById("mensajeProducto");

    switch(producto) {
        case "negra":
            mensaje.textContent = "La Polera Negra es nuestro modelo mas vendido y combina con cualquier estilo.";
            break;
        case "blanca":
            mensaje.textContent = "La Polera Blanca ofrece un diseno limpio y moderno.";
            break;
        case "roja":
            mensaje.textContent = "La Polera Roja destaca por su estilo urbano y llamativo.";
            break;
        case "azul":
            mensaje.textContent = "La Polera Azul es ideal para un look casual.";
            break;
        case "oversize":
            mensaje.textContent = "La Polera Oversize brinda mayor comodidad y un estilo moderno.";
            break;
        default:
            mensaje.textContent = "Seleccione una polera para ver su informacion.";
    }
}
