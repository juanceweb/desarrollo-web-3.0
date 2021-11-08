

// CLASE PRODUCTO
class Producto {
    constructor (producto, categoria, precio, descripcion, imagen, modelos) {
    product_id += 100;
    modelo_id = 0;
    this.id = product_id
    this.producto = producto;
    this.categoria = categoria
    this.descripcion = descripcion
    this.precio = precio;
    this.imagen = imagen
    this.prod_modelos = modelos
    this.cantidad = 0
    
    // POR CADA PRODUCTO, SE CREA UN OBJETO DE LA CLASE MODELO POR CADA MODELO DISTINTO DE ESE PRODUCTO (COLOR Y TALLE)
    for (const objeto of this.prod_modelos) {
        for (const modelo of objeto.modelo) {
            modelo_id ++
            my_modelos.push( new Modelo (this.id, (product_id + modelo_id) ,this.producto, this.categoria, this.descripcion, this.precio, objeto.color, objeto.imagen, modelo.talle, modelo.stock, this.cantidad))
        }       
    }
    }
}

// CLASE MODELO, COMPARTE EL ID DEL PRODUCTO QUE LO CREO, PERO CADA MODELO TIENE UN SUB ID PROPIO
class Modelo {
    constructor (id, id_modelo, producto, categoria, descripcion, precio, color, imagen, talle, stock, cantidad) {
    
    this.id = id
    this.modelo_id = id_modelo
    this.producto = producto;
    this.categoria = categoria
    this.descripcion = descripcion
    this.precio = precio;
    this.color = color;
    this.modelo_imagen = imagen
    this.talle = talle;
    this.stock = stock;
    this.cantidad = cantidad
    }

    // METODO QUE AUMENTA LA CANTIDAD SELECCIONADA, SI HAY STOCK PARA ESE MODELO DISPONIBLE, SINO LA CANTIDAD NO CAMBIA
    aumentar_cantidad(cantidad) {
        if (cantidad === this.stock || this.stock === undefined) {
            return false
        } else {
            return true 
        }
    }

    // METODO QUE REDUCE LA CANTIDAD SELECCIONADA, NO BAJA MAS DE 0
    reducir_cantidad(cantidad) {
        if (cantidad === 0 || this.stock === undefined) {
            return false
        } else {
            return true 
        }
    }
}