


$.get("/data/productos.json", function (respuesta, estado){
    if (estado === "success"){
        for (const objeto of respuesta) {
            my_productos.push( new Producto (objeto.producto, objeto.categoria, objeto.precio, objeto.descripcion, objeto.imagen, objeto.modelos))
        }
        mostrar_productos(my_productos)
    }
    else {
        console.log("hubo un error con el Json")
    }
})



