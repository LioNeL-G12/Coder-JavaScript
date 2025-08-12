
const productos = [
    { id: 1, nombre: "Gibson Les Paul", precio: 1500, imagen: "img/Gibson.jpg" },
    { id: 2, nombre: "Fender Stratocaster", precio: 1400, imagen: "img/Stratocaster.jpg" },
    { id: 3, nombre: "Ibanez RG", precio: 1200, imagen: "img/Ibanez.jpg" },
    { id: 4, nombre: "PRS Custom 24", precio: 1600, imagen: "img/prscustom24.jpg" },
    { id: 5, nombre: "Jackson Soloist", precio: 1100, imagen: "img/JacksonSoloist.jpg" },
    { id: 6, nombre: "Yamaha Pacifica", precio: 900, imagen: "img/YahamaPacifica.jpg" }
];


const contenedorProductos = document.getElementById("productos-container");
const contenedorCarrito = document.getElementById("carrito-container");
const totalHTML = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar-carrito");
const btnConfirmar = document.getElementById("confirmar-compra");
const modal = document.getElementById("modal-compra");
const btnCerrarModal = document.getElementById("cerrar-modal");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function mostrarProductos() {
    contenedorProductos.innerHTML = "";
    productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(div);
});


document.querySelectorAll(".btn-agregar").forEach(boton => {
    boton.addEventListener("click", e => {
    const id = Number(e.target.getAttribute("data-id"));
    agregarAlCarrito(id);
    });
});
}


function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    guardarCarrito();
    mostrarCarrito();
}


function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
        <p>${item.nombre} - $${item.precio}</p>
        <button class="btn-eliminar" data-index="${index}">❌</button>
    `;
    contenedorCarrito.appendChild(div);
});


document.querySelectorAll(".btn-eliminar").forEach(boton => {
    boton.addEventListener("click", e => {
    const index = Number(e.target.getAttribute("data-index"));
    eliminarDelCarrito(index);
    });
});

const total = carrito.reduce((acc, item) => acc + item.precio, 0);
totalHTML.textContent = total;
}


function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito();
}


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


btnVaciar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
});


btnConfirmar.addEventListener("click", () => {
    modal.classList.remove("oculta");
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
});


btnCerrarModal.addEventListener("click", () => {
modal.classList.add("oculta");
});

mostrarProductos();
mostrarCarrito();
