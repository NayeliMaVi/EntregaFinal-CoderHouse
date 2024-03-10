import { Carrito } from './schema.js';
let usuarioGuardado = localStorage.getItem('usuarioActual')
let user = JSON.parse(usuarioGuardado);

let carro = new Carrito();
carro.productos = user.carroCompras.productos
carro.precioTotal = user.carroCompras.precioTotal

let precio = document.getElementById("precio")
precio.innerText= carro.verPrecio()

function renderizarProductosCarro(array) {
    document.getElementById("carro").innerHTML = ""; 
    for (const p of carro.verProductos()) {
        let elemento = document.createElement("div")
        elemento.innerHTML= `<div id= "tarjeta-${p.id}"class="card " style="width: 18rem;">
        <img id="fotos-productos" src="${p.img}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">Precio: S/. ${p.precio}</p>
            <a href="#" id="btn-eliminarProducto(${p.id})" class="btn btn-primary"> Eliminar producto </a>
        </div>
    </div>`;
        document.getElementById("carro").appendChild(elemento);
        
        document.getElementById(`btn-eliminarProducto(${p.id})`).addEventListener('click', function () {

            Swal.fire({
                title: "Deseas eliminar este producto de tu carrito?",
                text: "Talvez ya no estará disponible más adelante",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Muy Seguro"
              }).then((result) => {
                if (result.isConfirmed) {
                    carro.eliminarProducto(p.id);
                    // Volver a guardar en el local por si acaso
                    user.carroCompras.productos = carro.verProductos()
                    user.carroCompras.precioTotal = carro.verPrecio()
                    localStorage.setItem('usuarioActual', JSON.stringify(user));

                    // Verifica si el carrito está vacío después de eliminar un producto    
                    setTimeout(function () {
                        if (carro.verProductos().length === 0) {
                            Swal.fire({
                                title: "Tu carrito está vacío",
                                text: "Te redirigiremos a la página principal.",
                                icon: "warning"
                            });
                            setTimeout(function () {
                                window.location.href = "index.html";
                            }, 3500);
                            return; // Evita renderizar productos si el carrito está vacío
                        }
                    }, 1000);
            

                    // Renderiza la lista de productos actualizada
                    renderizarProductosCarro(carro.verProductos());
                    precio.innerText = carro.verPrecio();

                    Swal.fire({
                        title: "Borrado!",
                        text: "El producto fue eliminado correctamente",
                        icon: "success"
                    });
                }
              });

          
        });
        
    }
}




renderizarProductosCarro(carro.verProductos())

