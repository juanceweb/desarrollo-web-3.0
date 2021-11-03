


$.get("/data/productos.json", function (respuesta, estado){
    if (estado === "success"){
        for (const objeto of respuesta) {
            my_productos.push( new Producto (objeto.producto, objeto.categoria, objeto.precio, objeto.descripcion, objeto.imagen, objeto.modelos))
        }
        mostrar_productos(my_productos)
        $("#span_carrito").html(carrito_compras.length)
        if ("carrito" in localStorage) {
            const datos = JSON.parse(localStorage.getItem('carrito'))
            for (const literal of datos) {
                carrito_compras.push( new Modelo (literal.id, literal.modelo_id, literal.producto, literal.categoria, literal.descripcion, literal.precio, literal.color, literal.modelo_imagen, literal.talle, literal.stock, literal.cantidad))
            }
            console.log(carrito_compras);
            $("#span_carrito").html(carrito_compras.length)
        }
    } else {
        console.log("hubo un error con el Json")
    }
})


// $(document).ready(function () {
//     if ("carrito" in localStorage) {
//         const datos = JSON.parse(localStorage.getItem('carrito'))
//         for (const literal of datos) {
//             let stored_producto = ( new Modelo (literal.id, literal.modelo_id, literal.producto, literal.categoria, literal.descripcion, literal.precio, literal.color, literal.modelo_imagen, literal.talle, literal.stock, literal.cantidad))
//             console.log(stored_producto.modelo_id);
//             console.log(stored_producto.cantidad);            
//             agregar_carrito(stored_producto.modelo_id, stored_producto.cantidad)
//         }
//     }
// })





