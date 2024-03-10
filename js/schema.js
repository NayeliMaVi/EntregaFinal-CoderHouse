export class Producto{
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


export class Persona{
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

export class Carrito{
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

    eliminarProducto(idProducto){
    let nuevoProductos = this.productos.filter(e=> e.id != idProducto)
        this.productos=nuevoProductos
        this.precioTotal=this.calcularPrecioTotal()
    }

    cantidadProductos(){
        return this.productos.length
    }

    vaciarCarro() {
        this.productos = [];
        this.precioTotal= 0;
    }

    verPrecio(){
        return this.precioTotal
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
