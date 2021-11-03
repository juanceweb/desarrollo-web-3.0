


$.get("/data/productos.json", function (respuesta, estado){
    if (estado === "success"){
        for (const objeto of respuesta) {
            my_productos.push( new Producto (objeto.producto, objeto.categoria, objeto.precio, objeto.descripcion, objeto.imagen, objeto.modelos))
        }
        if ("categoria" in localStorage) {
            const cat = JSON.parse(localStorage.getItem('categoria'))
            buscar_categoria(cat)
        } else {
            mostrar_productos(my_productos)
            
        }
        $("#span_carrito").html(carrito_compras.length)
    } else {
        console.log("hubo un error con el Json")
    }
})






