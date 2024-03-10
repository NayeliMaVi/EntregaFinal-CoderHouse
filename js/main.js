import { Persona, Producto } from "./schema.js"; 


let user = new Persona ("correo","contraseña")


let btnCarro = document.getElementById("carrito-btn")
btnCarro.addEventListener("click",function(){
    if(user.carroCompras.cantidadProductos()!=0){
        window.location.href="carrito.html"
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Todavía no has llenado tu carrito!",
          });
    }
})



let catalogo

function agregarAlCarrito(idProducto){
    user.carroCompras.agregarProducto(catalogo,idProducto)
    user.carroCompras.calcularPrecioTotal()
    let notificacion = document.getElementById("cantidad-carrito")
   notificacion.innerText = user.carroCompras.cantidadProductos()
   console.log(user.carroCompras.verProductos())
   localStorage.setItem('usuarioActual', JSON.stringify(user));
}

function renderizarProductos(array) {
    contenedorProductos.innerHTML = ""; 

    for (const p of array) {
        let elemento = document.createElement("div");
        elemento.className = "col-md-3 mb-4";
        elemento.innerHTML = `<div id="tarjeta-${p.id}" class="card" style="width: 18rem;">
            <img id="fotos-productos" src="${p.img}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">Precio: S/. ${p.precio}</p>
                <a href="#" id= "btn-agregarCarrito-${p.id}" class="btn btn-primary">Añadir al carrito</a>
            </div>
        </div>`;

        contenedorProductos.appendChild(elemento);
        document.getElementById(`btn-agregarCarrito-${p.id}`).addEventListener('click', function () {
            agregarAlCarrito(p.id);
            Toastify({ text: "Se ha añadido a tu carrito!",
        duration: 3000, gravity: "bottom", 
        style:{
            background: 'linear-gradient(to right,#D97904,#F29F05)'
        }
    }).showToast();
        });
    }
}

let usuariosRegistrados

fetch("/js/db.json")
    .then(response => response.json())
    .then(data => {
      
      console.log('Datos cargados:', data);

      
      const productosJson = data.productos;
      const usuariosJson = data.usuarios;
      catalogo = productosJson.map(productoJson => {
        return new Producto(productoJson.precio, productoJson.nombre, productoJson.clase, productoJson.img);
      });
      usuariosRegistrados = usuariosJson.map(usuariosJson =>{
        return new Persona(usuariosJson.correo, usuariosJson.contraseña)
        })
      renderizarProductos(catalogo);


      console.log('Productos :', catalogo);
      console.log('usuarios :', usuariosRegistrados);

    })
    .catch(error => {
      console.error('Error durante la carga del archivo JSON:', error);
    });



let contenedorProductos = document.getElementById("Productos-disponibles")



/// CAMBIAR USER PARA RECONOCER EL INICIO DE SESION 



// //Filtrado 
const input = document.querySelector("input");

input.addEventListener("input", function () {
    const filtro = input.value.toLowerCase();
    const productosFiltrados = catalogo.filter(producto => producto.nombre.toLowerCase().includes(filtro));
    
    renderizarProductos(productosFiltrados);
});
