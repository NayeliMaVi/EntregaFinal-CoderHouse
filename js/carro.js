
let usuarioGuardado = localStorage.getItem('usuarioActual')
let user = JSON.parse(usuarioGuardado);

let productos = user.carroCompras.productos
console.log(user.carroCompras.productos)
for (const p of productos) {
    let elemento = document.createElement("div")
    elemento.innerHTML= `<div id= "tarjeta-${p.id}"class="card " style="width: 18rem;">
    <img id="fotos-productos" src="${p.img}" class="card-img-top" alt="${p.nombre}">
    <div class="card-body">
        <h5 class="card-title">${p.nombre}</h5>
        <p class="card-text">Precio: S/. ${p.precio}</p>
        <a href="#" onclick="eliminarProducto(${p.id})" class="btn btn-primary"> Eliminar producto </a>
    </div>
</div>`;
    document.getElementById("carro").appendChild(elemento);
    
}

function eliminarProducto(idProducto){
    productos=productos.filter(e => e.id != idProducto)
    let tarjeta = document.getElementById(`tarjeta-${idProducto}`);
        tarjeta.style.display = 'none';
    user.carroCompras.productos = productos
    // console.log(user.carroCompras.calcularPrecioTotal) buscar manera de acceder a los metodos desde otra pag.
}

let precio = document.getElementById("precio")
precio.innerText= user.carroCompras.precioTotal