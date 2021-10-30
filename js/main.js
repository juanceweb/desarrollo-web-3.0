


$.get("/data/productos.json", function (respuesta, estado){
    if (estado === "success"){
        for (const objeto of respuesta) {
            productos.push( new Producto (objeto.producto, objeto.categoria, objeto.precio, objeto.descripcion))
        }
        mostrar_productos(productos)
        // refrescar_carrito(carrito_compras)
    }
    else {
        console.log("hubo un error con el Json")
    }
})



