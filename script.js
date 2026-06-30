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
