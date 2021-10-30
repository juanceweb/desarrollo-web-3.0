


class Producto {
    constructor (producto, categoria, precio, descripcion) {
    product_id += 1
    this.id = product_id
    this.producto = producto;
    this.categoria = categoria
    this.descripcion = descripcion
    this.precio = precio;
    this.modelos = [
        {color:"NEGRO", modelo:[{talle:"L",stock:5},{talle:"M",stock:8},{talle:"S",stock:11}]},
        {color:"AZUL", modelo:[{talle:"L",stock:2},{talle:"M",stock:4},{talle:"S",stock:6}]},
        {color:"ROJO", modelo:[{talle:"XL",stock:1},{talle:"L",stock:2}]}
    ]
    }

    traer_colores () {
        this.colores = []
        for (let position in this.modelos) {
            this.colores.push(this.modelos[position].color);
        }
        return this.colores
    }

    traer_talles(color) {
        this.talles = []
        let index = this.colores.indexOf(color)
        for (let position in this.modelos[index].modelo) {
            this.talles.push(this.modelos[index].modelo[position].talle)
        }
        return this.talles
    }

    traer_stock(color, talle) {
        let index1 = this.colores.indexOf(color)
        let index2 = this.talles.indexOf(talle)
        this.stock = this.modelos[index1].modelo[index2].stock;
        console.log("El Stock de este producto es:" + this.stock);
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

    subir_a_carrito (color, talle, cantidad) {
        return {id:`${this.id}`,producto:`${this.producto}`, precio:`${this.precio}`,color:`${color}`, talle:`${talle}`, cantidad:`${cantidad}`}
    }
}
