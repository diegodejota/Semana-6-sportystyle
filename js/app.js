console.log("App cargada correctamente 🚀");
console.log(window.auth0);

const productos = [
    {
        id: 1,
        nombre: "Camiseta deportiva",
        descripcion: "Camisera deportiva color negro para hombres",
        precio: 10000,
        imagen: "img/camiseta.jpg"
    },
    {
        id: 2,
        nombre: "Pantalón deportivo",
        descripcion: "Pantalon deportivo color negro para hombres",
        precio: 15000,
        imagen: "img/pantalon.jpg"
    },
    {
        id: 3,
        nombre: "Botella deportiva",
        descripcion: "Botella color negro",
        precio: 5000,
        imagen: "img/botella.jpg"
    }
];

document.getElementById("loginBtn").addEventListener("click", async () => {
    console.log("click login"); // DEBUG
    await auth0.loginWithRedirect();
});

const contenedorProductos = document.getElementById("productos");

productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");

div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>${producto.descripcion}</p>
    <p><strong>$${producto.precio}</strong></p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
`;

    contenedorProductos.appendChild(div);
});

function agregarAlCarrito(id) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    const producto = productos.find(p => p.id === id);

    const existe = carrito.find(p => p.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    const totalDiv = document.getElementById("total");

    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    carritoDiv.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        carritoDiv.innerHTML += `
            <p>${p.nombre} - $${p.precio} x ${p.cantidad}</p>
        `;
        total += p.precio * p.cantidad;
    });

    totalDiv.innerText = "Total: $" + total;
}

mostrarCarrito();


let auth0 = null;

window.onload = async () => {
    auth0 = await window.auth0.createAuth0Client({
        domain: "diegodejota.us.auth0.com",
        clientId: "Pyte2AqoFn239ccHPJcc6QXlvufs6z5i",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    });

    // 
    if (window.location.search.includes("code=") &&
        window.location.search.includes("state=")) {

        await auth0.handleRedirectCallback();

        // limpia la URL
        window.history.replaceState({}, document.title, "/");
    }

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
        const user = await auth0.getUser();
        document.getElementById("userInfo").innerText = "Bienvenido, " + user.name;
    }

    // botón login
    document.getElementById("loginBtn").addEventListener("click", async () => {
        await auth0.loginWithRedirect();
    });

    // botón logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        auth0.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
        sessionStorage.clear();
    });
};

document.getElementById("formCompra").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;

    // Validaciones simples
    if (!correo.includes("@")) {
        alert("Correo inválido");
        return;
    }

    if (!/^\d+$/.test(telefono)) {
        alert("Teléfono inválido (solo números)");
        return;
    }

    mostrarConfirmacion(nombre, direccion, correo, telefono);
});

function mostrarConfirmacion(nombre, direccion, correo, telefono) {
    let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    let resumen = "🛒 Compra realizada\n\n";
    let total = 0;

    carrito.forEach(p => {
        resumen += `${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}\n`;
        total += p.precio * p.cantidad;
    });

    resumen += `\nTotal: $${total}\n\n`;
    resumen += `Cliente: ${nombre}\nDirección: ${direccion}`;

    alert(resumen);

    // limpiar carrito
    sessionStorage.removeItem("carrito");
    mostrarCarrito();

    // limpiar formulario
document.getElementById("formCompra").reset();
}