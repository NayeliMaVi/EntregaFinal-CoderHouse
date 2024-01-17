let usuariosRegistrados={}
let respuesta = ""

// // La mejor opcion es usar clases, pero se reemplazado a futuro
// const Usuario ={
// };

let catalogo={
    1: { precio: 210, nombre: "GiftCard 50 💲" },
    2: { precio: 100, nombre: "GiftCard 25 💲" },
    3: { precio: 50, nombre: "GiftCard 10 💲" },
    4: { precio: 50, nombre: "PS Plus 🟡 1 mes" },
    5: { precio: 170, nombre: "PS Plus 🟡 3 meses" },
    6: { precio: 200, nombre: "GiftCard 50 💲" },
    7: { precio: 100, nombre: "GiftCard 25 💲" },
    8: { precio: 40, nombre: "GiftCard 10 💲" },
    9: { precio: 30, nombre: "GamePass 🟢 1 mes" },
    10: { precio: 100, nombre: "GamePass 🟢 3 meses" }
}

function sumar(opc,suma,productos){
    if(opc>0 && opc < 11)
    {   
        suma+=catalogo[opc].precio
        productos.push(catalogo[opc])
        console.log("Producto seleccionado: "+ catalogo[opc].nombre)
        return suma
    }
    return suma
}

function resumen(suma,productos){
    let mensaje=""
    for (const i in productos) {
        const p = productos[i];
        mensaje += `Producto: ${p.nombre} - Precio: ${p.precio}\n`
    }
    alert(mensaje + `\nPrecio final: ${suma} ` )
}

function menuCompra(){
    let opcion = parseInt(prompt("=======Catalogo 📋 =======\n             ˗ ˏˋ✭ PS4 ✭ˎˊ˗    \n1. GiftCard 50 💲  ………  S/. 210 \n2. GiftCard 25 💲  ………  S/. 100 \n3. GiftCard 10 💲  ………  S/. 50  \n4. PS Plus 1 mes        ………  S/. 50 \n5. PS Plus 3 meses      ………  S/. 170 \n             ˗ ˏˋ✭ XBOX ✭ˎˊ˗    \n6. GiftCard 50 💲  ………  S/. 200 \n7. GiftCard 25 💲  ………  S/. 100 \n8. GiftCard 10 💲  ………  S/. 40  \n9. GamePass 1 mes       ………  S/. 30 \n10. GamePass 3 meses    ………  S/. 100 \n=====================\n            11. Finalizar\n"))
    return parseInt(opcion)
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
   
    usuariosRegistrados[userEmailSaved] = userPswSaved;
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
    
    if(usuariosRegistrados[userEmail]){
        while(true){
            userPsw = prompt("Ingresa tu contraseña")
            if (!userPsw) {
                alert("Ocupas rellenar la casilla para avanzar.")
            } else {break}
        }  
        if(userPsw==usuariosRegistrados[userEmail]){
        
            alert("Ingresando a Chilly Willy Codes 🐈")
            let precioFinal=0;
            let op;
            let productosSelecionados = []
            do{
                op = menuCompra()
                precioFinal = sumar(op,precioFinal,productosSelecionados)
            console.log("Precio: " + precioFinal)
            if(op>11){
                alert("Opcion no valida. ❌")
            }
            }while(op !=11)
            resumen(precioFinal,productosSelecionados)
            console.log("Precio final:" + precioFinal)

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

