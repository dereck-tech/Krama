const publicaciones = [
    {
        id: 1,
        usuario: "Isa Marcial",
        categoria: "Tecnología",
        texto: "El nuevo Galaxy S21+ 5G apuesta por una pantalla de alta calidad, un procesador potente y excelentes cámaras.",
        imagen: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=85",
        likes: 112500,
        comentarios: 40500,
        guardada: false,
        compartida: false,
        meGusta: false
    },
    {
        id: 2,
        usuario: "Alexandra",
        categoria: "Música",
        texto: "Qué increíble es la música, que nos lleva a recordar experiencias hermosas. Gracias a quienes la crearon.",
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
        likes: 10000,
        comentarios: 5000,
        guardada: false,
        compartida: false,
        meGusta: false
    },
    {
        id: 3,
        usuario: "Coutí Kirkes",
        categoria: "Deportes",
        texto: "Terminé los 200 metros mariposa. Fue complicado y cansado, pero toca mantenernos firmes y seguir adelante.",
        imagen: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=85",
        likes: 12500,
        comentarios: 2500,
        guardada: false,
        compartida: false,
        meGusta: false
    }
];

let siguienteId = 4;

const formulario = document.querySelector("#formulario-publicacion");
const lista = document.querySelector(".lista-publicaciones");
const filtro = document.querySelector("#filtro-categoria");
const buscador = document.querySelector(".buscador input");

function formatoLikes(numero) {
    if (numero >= 1000) {
        return (numero / 1000).toLocaleString("en-US", {
            maximumFractionDigits: 1
        }) + " K";
    }

    return numero;
}

function mostrarPublicaciones() {
    lista.innerHTML = "";

    const categoria = filtro.value;
    const busqueda = buscador.value.toLowerCase();

    const resultados = publicaciones.filter(function (p) {
        const coincideCategoria =
            categoria === "Todas" || p.categoria === categoria;

        const coincideBusqueda =
            p.usuario.toLowerCase().includes(busqueda) ||
            p.texto.toLowerCase().includes(busqueda) ||
            p.categoria.toLowerCase().includes(busqueda);

        return coincideCategoria && coincideBusqueda;
    });

resultados.forEach(function (p) {
    lista.innerHTML += `
        <article class="tarjeta-publicacion">
            <div class="encabezado-publicacion">
                <div class="usuario-publicacion">
                    <div class="avatar">${p.usuario[0]}</div>
                    <div>
                        <h3>${p.usuario}</h3>
                        <p>@${p.usuario.toLowerCase().replace(/\s+/g, "")}</p>
                    </div>
                </div>
                <span class="categoria-publicacion">${p.categoria}</span>
            </div>

            <div class="contenido-publicacion">
                <p>${p.texto}</p>
                ${p.imagen ? `<img class="imagen-publicacion" src="${p.imagen}" alt="Imagen de la publicación">` : ""}
            </div>

            <div class="acciones-publicacion">
                <button onclick="darMeGusta(${p.id})">
                    ${p.meGusta ? "♥ " : "♡ "}${formatoLikes(p.likes)}
                </button>

            <button onclick="verComentarios(${p.id})">
                 ○ ${formatoLikes(p.comentarios)}
            </button>

            <button onclick="compartirPublicacion(${p.id})">
                ${p.compartida ? "Compartida" : "Compartir"}
            </button>

            <button onclick="guardarPublicacion(${p.id})">
                        ${p.guardada ? "Guardada" : "Guardar"}
            </button>

            <button onclick="eliminarPublicacion(${p.id})">
                Eliminar
            </button>
            </div>
        </article>
    `;
});

    if (resultados.length === 0) {
        lista.innerHTML = "<p>No se encontraron publicaciones.</p>";
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const usuario = document.querySelector("#nombre-usuario").value.trim();
    const texto = document.querySelector("#texto-publicacion").value.trim();
    const categoria = document.querySelector("#categoria-publicacion").value;

    if (usuario === "" || texto === "" || categoria === "") {
        alert("Completá todos los campos.");
        return;
    }

    publicaciones.push({
        id: siguienteId,
        usuario: usuario,
        categoria: categoria,
        texto: texto,
        imagen: "",
        likes: 0,
        comentarios: 0,
        guardada: false,
        compartida: false,
        meGusta: false
    });

    siguienteId++;
    formulario.reset();
    filtro.value = "Todas";
    buscador.value = "";

    
document.querySelector('a[href="#notificaciones"]').addEventListener("click", function (evento) {
    evento.preventDefault();
    alert("No tienes ninguna notificación");
});

document.querySelector('a[href="#mensajes"]').addEventListener("click", function (evento) {
    evento.preventDefault();
    alert("No tienes mensajes (por el momento)");
});

    mostrarPublicaciones();
});

function darMeGusta(id) {
    const p = publicaciones.find(function (p) {
        return p.id === id;
    });

    if (p) {
        if (p.meGusta) {
            p.likes--;
        } else {
            p.likes++;
        }

        p.meGusta = !p.meGusta;
        mostrarPublicaciones();
    }
}

function verComentarios(id) {
    const p = publicaciones.find(function (p) {
        return p.id === id;
    });

    if (p) {
        alert("Total de comentarios: " + p.comentarios);
    }
}

function compartirPublicacion(id) {
    const p = publicaciones.find(function (p) {
        return p.id === id;
    });

    if (p) {
        p.compartida = !p.compartida;
        mostrarPublicaciones();
    }
}

function guardarPublicacion(id) {
    const p = publicaciones.find(function (p) {
        return p.id === id;
    });

    if (p) {
        p.guardada = !p.guardada;
        mostrarPublicaciones();
    }
}

function eliminarPublicacion(id) {
    const posicion = publicaciones.findIndex(function (p) {
        return p.id === id;
    });

    if (posicion !== -1) {
        publicaciones.splice(posicion, 1);
        mostrarPublicaciones();
    }
}

filtro.addEventListener("change", mostrarPublicaciones);
buscador.addEventListener("input", mostrarPublicaciones);

document.querySelectorAll(".persona-sugerida button").forEach(function (boton) {
    boton.addEventListener("click", function () {
        if (boton.textContent === "Seguir") {
            boton.textContent = "Siguiendo";
        } else {
            boton.textContent = "Seguir";
        }
    });
});

document.querySelector(".perfil-lateral button").addEventListener("click", function () {
    document.querySelector("#perfil").scrollIntoView({
        behavior: "smooth"
    });
});

document.querySelector("#perfil .boton-secundario").addEventListener("click", function () {
    const nombreActual = document.querySelector("#perfil h2").textContent;
    const nombreNuevo = prompt("Ingresa tu Nombre de Usuario", nombreActual);

    if (nombreNuevo !== null && nombreNuevo.trim() !== "") {
        const nombre = nombreNuevo.trim();

        document.querySelector("#perfil h2").textContent = nombre;
        document.querySelector(".perfil-lateral h3").textContent = nombre;
        document.querySelector(".perfil-pequeno span").textContent = nombre.split(" ")[0];
        document.querySelector("#perfil .datos-perfil p:nth-of-type(2)").textContent =
    "@" + nombre.toLowerCase().replace(/\s+/g, "");
        document.querySelector(".perfil-pequeno .avatar").textContent = nombre[0].toUpperCase();
        document.querySelector("#perfil .avatar-grande").textContent = nombre[0].toUpperCase();
    }

    const descripcion = document.querySelector("#perfil .datos-perfil p:last-child");
    const descripcionNueva = prompt(
        "Escribe una descripción que te represente.",
        descripcion.textContent
    );

    if (descripcionNueva !== null) {
        descripcion.textContent = descripcionNueva.trim();
    }
});
console.log("KRAMA ya funciona");
mostrarPublicaciones();

