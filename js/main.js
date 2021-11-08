

// LLAMADO GET, DEL QUE TOMO LOS PRODUCTOS DE JSON DE DATA
$.get("/data/productos.json", function (respuesta, estado){
    if (estado === "success"){
        // SE TOMAN LOS OBJETOS OBTENIDOS DEL JSON, Y LOS HAGO CLASE PRODUCTOS
        for (const objeto of respuesta) {
            my_productos.push( new Producto (objeto.producto, objeto.categoria, objeto.precio, objeto.descripcion, objeto.imagen, objeto.modelos))
        }
        // ESTO HACE QUE CUANDO EL USUARIO BUSCA UNA CATEGORIA, SI VA A OTRA VENTANA O LA CIERRA, CUANDO VUELVA VOLVERA A ESTAR EN ESA CATEGORIA
        if ("categoria" in localStorage) {
            const cat = JSON.parse(localStorage.getItem('categoria'))
            buscar_categoria(cat)
        } else {
            mostrar_productos(my_productos)
            
        }
        // MARCA LA CANTIDAD DE PRODUCTOS EN EL CARRITO
        $("#span_carrito").html(carrito_compras.length)
    } else {
        console.log("hubo un error con el Json")
    }
})






