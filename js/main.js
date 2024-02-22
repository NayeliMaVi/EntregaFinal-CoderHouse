

    class Producto{
        static contador = 1;  
        constructor(precio, nombre, clase,img)
        {
            this.id=Producto.contador++;
            this.nombre=nombre;
            this.precio=precio;
            this.clase = clase;
            this.img=img;
        }

    }

    class Carrito{
        constructor(){
            this.productos = [];
            this.precioTotal= 0;
            
        }
        agregarProducto(productos,id){
            let item = productos.find(e => e.id == id)
            if(item){
                this.productos.push(item)
                console.log("Se agrego el siguiente producto al carrito: ", item)
            } 
        }
        verProductos(){
            return this.productos;
        }
        calcularPrecioTotal(){
            this.precioTotal= 0;
            this.productos.forEach(e => {this.precioTotal += e.precio})
            console.log("Precio Total: " + this.precioTotal)
            return this.precioTotal
        }

        cantidadProductos(){
            return this.productos.length
        }

        vaciarCarro() {
            this.productos = [];
        }

        resumen(){
            let mensaje=""
            for (const i in this.productos) {
            const p = this.productos[i];
                mensaje += `Producto: ${p.nombre} - Precio: ${p.precio}\n`
            }
            this.vaciarCarro()
            alert(mensaje + `\nPrecio final: ${this.precioTotal} ` ) // o usar el calularpreciototal
        }

    }

    class Persona{
        static contador = 0;  
        constructor(correo, contraseña){
            this.id=Persona.contador++; // Analizando si es viable tener un id 
            this.correo=correo;
            this.contraseña=contraseña;
            this.carroCompras=new Carrito();
        }

        getCorreo(){
            return this.correo
        }
    }

    let usuariosRegistrados=[]


    let datosProductos=[
        { precio: 210, nombre: "GiftCard 50 💲 PSN" , clase: "PSN", img:"../css/img/psn-gift-card-50-usd.jpg"  },
        { precio: 100, nombre: "GiftCard 25 💲 PSN" , clase: "PSN", img: "../css/img/PSN-CARD-25.jpg"},
        { precio: 50, nombre: "GiftCard 10 💲 PSN", clase: "PSN",img:"../css/img/psn 10.jpeg" },
        { precio: 50, nombre: "PS Plus 🟡 1 mes", clase: "PSN", img:"../css/img/psn plus 1.jpg" },
        { precio: 170, nombre: "PS Plus 🟡 3 meses", clase: "PSN", img:"../css/img/spn 3 plus.jpeg" },
        { precio: 500, nombre: "PS Plus 🟡 12 meses", clase: "PSN",img:"../css/img/psn plus 12.jpg" },
        { precio: 200, nombre: "GiftCard 50 💲 Xbox", clase: "XBOX",img:"../css/img/xbox 50.jpg" },
        { precio: 100, nombre: "GiftCard 25 💲 Xbox", clase: "XBOX", img:"../css/img/xbox 25.jpg" },
        { precio: 40, nombre: "GiftCard 10 💲 Xbox", clase: "XBOX", img:"../css/img/Xbox-Live-Card-10.jpg" },
        { precio: 23, nombre: "GiftCard 5 💲 Xbox", clase: "XBOX", img:"../css/img/xbox 5.jpeg" },
        { precio: 30, nombre: "GamePass 🟢 1 mes", clase: "XBOX",img:"../css/img/xbox 1.jpg" },
        { precio: 100, nombre: "GamePass 🟢 3 meses", clase: "XBOX", img:"../css/img/xbox 3 mes.png" }
    ]

    function crearCatalogo (datosProductos){
        const catalogo = []
        for (const e of datosProductos) {
            const producto = new Producto(e.precio,e.nombre,e.clase,e.img)
            catalogo.push(producto)
        }
        return catalogo
    }

    let catalogo = crearCatalogo(datosProductos)
    console.log(catalogo)

let contenedorProductos = document.getElementById("Productos-disponibles")
console.log(contenedorProductos)

for (const p of catalogo) {
        let elemento = document.createElement("div")
        elemento.className="col-md-3 mb-4"
        elemento.innerHTML= `<div id= "tarjeta-${p.id}"class="card " style="width: 18rem;">
        <img id="fotos-productos" src="${p.img}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">Precio: S/. ${p.precio}</p>
            <a href="#" onclick="agregarAlCarrito(${p.id})" class="btn btn-primary">Añadir al carrito</a>
        </div>
    </div>`;
        document.getElementById("Productos-disponibles").appendChild(elemento);
        
}

let user = new Persona ("correo","contraseña")




function agregarAlCarrito(idProducto){
    user.carroCompras.agregarProducto(catalogo,idProducto)
    user.carroCompras.calcularPrecioTotal()
    let notificacion = document.getElementById("cantidad-carrito")
   notificacion.innerText = user.carroCompras.cantidadProductos()
   console.log(user.carroCompras.verProductos())
   localStorage.setItem('usuarioActual', JSON.stringify(user));
}


//Filtrado 
const input = document.querySelector("input");


input.addEventListener('input', function(event) {
    
    let valorInput = event.target.value;
    console.log('Input cambiado:', valorInput);

    let resultado =catalogo.filter((e) => e.clase.includes(valorInput)||
    e.nombre.toLowerCase().includes(valorInput) )

    // Ocultar todas las tarjetas
    catalogo.forEach(function (producto) {
        let tarjeta = document.getElementById(`tarjeta-${producto.id}`);
        tarjeta.style.display = 'none';
    });

    // Mostrar solo las tarjetas filtradas
    resultado.forEach(function (producto) {
        let tarjeta = document.getElementById(`tarjeta-${producto.id}`);
        tarjeta.style.display = 'block';
    });
})
    



