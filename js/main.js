// import { Producto, Carrito, Persona } from './clases'

class Producto{
    static contador = 1;  
    constructor(precio, nombre, clase)
    {
        this.id=Producto.contador++;
        this.nombre=nombre;
        this.precio=precio;
        this.clase = clase;
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

    calcularPrecioTotal(){
        this.precioTotal= 0;
        this.productos.forEach(e => {this.precioTotal += e.precio})
        console.log("Precio Total: " + this.precioTotal)
        return this.precioTotal
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
    { precio: 210, nombre: "GiftCard 50 💲 PSN" , clase: "PSN"  },
    { precio: 100, nombre: "GiftCard 25 💲 PSN" , clase: "PSN"},
    { precio: 50, nombre: "GiftCard 10 💲 PSN", clase: "PSN" },
    { precio: 50, nombre: "PS Plus 🟡 1 mes", clase: "PSN" },
    { precio: 170, nombre: "PS Plus 🟡 3 meses", clase: "PSN" },
    { precio: 500, nombre: "PS Plus 🟡 12 meses", clase: "PSN" },
    { precio: 200, nombre: "GiftCard 50 💲 Xbox", clase: "XBOX" },
    { precio: 100, nombre: "GiftCard 25 💲 Xbox", clase: "XBOX" },
    { precio: 40, nombre: "GiftCard 10 💲 Xbox", clase: "XBOX" },
    { precio: 23, nombre: "GiftCard 5 💲 Xbox", clase: "XBOX" },
    { precio: 30, nombre: "GamePass 🟢 1 mes", clase: "XBOX" },
    { precio: 100, nombre: "GamePass 🟢 3 meses", clase: "XBOX" }
]

function crearCatalogo (datosProductos){
    const catalogo = []
    for (const e of datosProductos) {
        const producto = new Producto(e.precio,e.nombre,e.clase)
        catalogo.push(producto)
    }
    return catalogo
}

let catalogo = crearCatalogo(datosProductos)
console.log(catalogo)

function menuCompra(user){
    let opcion = parseInt(prompt(`Bienvendido ${user.getCorreo()} \n=======Catalogo 📋 =======\n             ˗ ˏˋ✭ PS4 ✭ˎˊ˗    \n1. GiftCard 50 💲  ………  S/. 210 \n2. GiftCard 25 💲  ………  S/. 100 \n3. GiftCard 10 💲  ………  S/. 50  \n4. PS Plus 1 mes        ………  S/. 50 \n5. PS Plus 3 meses      ………  S/. 170 \n6. PS Plus 12 meses      ………  S/. 500 \n             ˗ ˏˋ✭ XBOX ✭ˎˊ˗    \n7. GiftCard 50 💲  ………  S/. 200 \n8. GiftCard 25 💲  ………  S/. 100 \n9. GiftCard 10 💲  ………  S/. 40  \n10. GiftCard 5 💲  ………  S/. 23  \n11. GamePass 1 mes       ………  S/. 30 \n12. GamePass 3 meses    ………  S/. 100  \n=====================\n            13. Finalizar\n`))
    return parseInt(opcion)
}

function imprimirfiltrado(catalogoFiltrado){

    let mensaje=""
        for (const i in catalogoFiltrado) {
         const p = catalogoFiltrado[i];
            mensaje += `${i+1}. Producto: ${p.nombre} - Precio: ${p.precio}\n`
        }

        return mensaje
}

function mostrarPorFiltrado(user,catalogo){
    let tipo = prompt("Escoga la categoria ( xbox o psn) ").toLocaleUpperCase()
    let resultado
    let op
    if(tipo==="XBOX"){
    resultado=catalogo.filter((e) => e.clase.includes(tipo) )
    console.log("resultado" + resultado)
   
        alert(imprimirfiltrado(resultado))
        

    } else if (tipo=="PSN"){
        resultado=catalogo.filter((e) => e.clase.includes(tipo))
        console.log("resultado" + resultado)
        alert(imprimirfiltrado(resultado))
       
    }else{
        alert("Parametro no valido")
    }
}


function comprarSinFiltrar(user){
     alert("Ingresando a Chilly Willy Codes 🐈")
          
            let op;
           
            do{
                op = menuCompra(user)
                user.carroCompras.agregarProducto(catalogo,op)
                user.carroCompras.calcularPrecioTotal()
            if(op>13){
                alert("Opcion no valida. ❌")
            }
            }while(op !=13)
            user.carroCompras.resumen()
}

function crearCuenta() {
    let userEmailSaved = ""
    let userPswSaved = ""

        alert(" Es hora de crearte una cuenta.")
    while(true){
         userEmailSaved = prompt("Ingresa tu email").toLowerCase()
        if (!userEmailSaved) {
            alert("Ocupas rellenar la casilla del email para avanzar.")
        } else {break}
    }
   

    while(true){
       userPswSaved = prompt("crea tu contraseña")
        if (!userPswSaved) {
            alert("Ocupas rellenar la casilla del contraseña para avanzar.")
        } else {break}
    }
   
    const user = new Persona(userEmailSaved, userPswSaved)
    usuariosRegistrados.push(user)
    
    console.log("usuarios: ", usuariosRegistrados)
}

function iniciarSesion(){
    let userEmail = "."
    let userPsw = "."

    alert("Ingresa tus datos a continuacion")
    while(true){
        userEmail = prompt("Ingresa tu email").toLowerCase()
        if (!userEmail) {
            alert("Ocupas rellenar la casilla para avanzar.")
        } else {break}
    }
    
    let user = usuariosRegistrados.find(e => e.correo == userEmail) // Buscar 

    if(user){ // SI existe
        while(true){
            userPsw = prompt("Ingresa tu contraseña")
            if (!userPsw) {
                alert("Ocupas rellenar la casilla para avanzar.")
            } else {break}
        }  
        if(user.contraseña ==userPsw){
            let opc = parseInt(prompt("¿Como vas a comprar? \n1. Buscar por categoria \n2. Mostrar todos los productos"))
            switch(opc){
                case 1: {
                    mostrarPorFiltrado(user,catalogo)
                    break;
                }
                case 2:{
                    comprarSinFiltrar(user)
                    break;
                }
                default:{
                    alert("Escoga una opcion valida")
                    break;
                }
            }
            

        }else{
            alert("ERROR. Contraseña incorrecta ❌")
        }
    
    }else{
        alert("No existe alguien con ese correo registrado 🔎❌")
    }
  
}

function menuInicio() {
    let opcion = parseInt(prompt("============ Chilly Willy Codes  🐈==========\n  1. Iniciar Sesion.\n   2. Registrarse.\n   3. Finalizar"))
    return opcion
}

function opciones(opcion){
    switch (opcion) {
        case 1:
            {
                iniciarSesion()
            }
            break;

        case 2:
            {
                crearCuenta()
            }
            break;
        case 3:
            {
                alert("Gracias por confiar en nosotros. Vuelva Pronto. 👋")
                break;
            }
        default:
            {
                alert("Porfavor Eliga una opcion")
            }
            break;
    }
}


// MAIN 
alert("Te damos la bienvenida a 'Chilly Willy Codes 🐈' ")
let opc=0
do{
    opc = menuInicio()
    opciones(opc)
} while (opc != 3);

