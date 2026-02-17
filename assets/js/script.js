/* ESTADO GLOBAL*/

var carrito = [];

/*  ELEMENTOS DEL DOM */

var botonesAgregar = document.querySelectorAll(".btn-add");
var badge = document.querySelector("#cart-count");
var listaCarrito = document.querySelector("#lista-carrito");

/* EVENTO AGREGAR PRODUCTO */

for (var i = 0; i < botonesAgregar.length; i++) {

    botonesAgregar[i].addEventListener("click", function () {

        var card = this.parentElement.parentElement;

        var nombre = card.querySelector(".producto-nombre").textContent;
        var precioTexto = card.querySelector(".producto-precio").textContent;

        var precio = parseInt(
            precioTexto.replace("$", "").replace(".", "")
        );

        var producto = {
            nombre: nombre,
            precio: precio
        };

        carrito.push(producto);

        actualizarBadge();
        renderizarCarrito();
    });
}

/* ACTUALIZAR BADGE */

function actualizarBadge() {
    if (badge) {
        badge.textContent = carrito.length;
    }
}

/* RENDERIZAR CARRITO */

function renderizarCarrito() {

    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";

    var total = 0;

    for (var i = 0; i < carrito.length; i++) {

        total += carrito[i].precio;

        listaCarrito.innerHTML +=
            "<tr>" +
                "<td>" + carrito[i].nombre + "</td>" +
                "<td>1</td>" +
                "<td>$" + carrito[i].precio.toLocaleString('es-CL') + "</td>" +
                "<td>" +
                    "<button class='btn btn-sm btn-outline-danger' onclick='eliminarProducto(" + i + ")'>X</button>" +
                "</td>" +
            "</tr>";
    }

    var totalElemento = document.querySelector("#total-carrito");

    if (totalElemento) {
        totalElemento.textContent =
            "$" + total.toLocaleString('es-CL');
    }
}

/* ELIMINAR PRODUCTO */

function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarBadge();
    renderizarCarrito();
}