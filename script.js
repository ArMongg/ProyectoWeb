document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       IMÁGENES (MODAL)
    ========================== */

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


    /* =========================
       VIDEOS (MODAL)
    ========================== */

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


    /* =========================
       ESC PARA CERRAR TODO
    ========================== */

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

    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        const confirmar = confirm("¿Estás seguro de enviar tus datos?");

        if (confirmar) {

            const nombreUsuario = prompt("Para confirmar, escribe tu nombre:");

            if (nombreUsuario) {
                alert("¡Gracias " + nombreUsuario + ", formulario enviado!");
            } else {
                alert("No escribiste tu nombre.");
            }

        } else {
            alert("Envío cancelado.");
        }

    });

});
