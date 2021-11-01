


class Producto {
    constructor (producto, categoria, precio, descripcion) {
    product_id += 100;
    modelo_id = 0;
    this.id = product_id
    this.producto = producto;
    this.categoria = categoria
    this.descripcion = descripcion
    this.precio = precio;
    this.modelos = [
        {color:"negro", modelo:[{talle:"l",stock:5},{talle:"m",stock:8},{talle:"s",stock:11}]},
        {color:"azul", modelo:[{talle:"l",stock:2},{talle:"m",stock:4},{talle:"s",stock:6}]},
        {color:"rojo", modelo:[{talle:"xl",stock:1},{talle:"l",stock:2}]}
    ]
    
    for (const objeto of this.modelos) {
        for (const modelo of objeto.modelo) {
            modelos.push( new Modelo (this.id, this.producto, this.categoria, this.descripcion, this.precio, objeto.color, modelo.talle, modelo.stock  ))
        }       
    }
    }
}


class Modelo {
    constructor (id, producto, categoria, descripcion, precio, color, talle, stock) {
    modelo_id += 1
    this.id = id
    this.modelo_id = id + modelo_id
    this.producto = producto;
    this.categoria = categoria
    this.descripcion = descripcion
    this.precio = precio;
    this.color = color;
    this.talle = talle;
    this.stock = stock;
    this.cantidad = 0
    }

    aumentar_cantidad(cantidad) {
        console.log("Stock:" + this.stock);
        if (cantidad === this.stock || this.stock === undefined) {
            return false
        } else {
            return true 
        }
    }

    reducir_cantidad(cantidad) {
        console.log("Stock:" + this.stock);
        if (cantidad === 0 || this.stock === undefined) {
            return false
        } else {
            return true 
        }
    }
}