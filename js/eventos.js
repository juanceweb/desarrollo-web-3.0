

$(".busqueda").on( "click",(e) => {  
    e.preventDefault();
    let encontrado;

    switch (e.target.id) {
        case "camisones":
            encontrado = my_productos.filter (producto => producto.categoria === "camison")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("camisones")
            break;

        case "pijamas":
            encontrado = my_productos.filter (producto => producto.categoria === "pijama")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("pijamas")
            break;

        case "batas_monos":
            encontrado = my_productos.filter (producto => producto.categoria === "bata" || producto.categoria === "mono")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("batas/monos")
            break;

        case "camisetas":
            encontrado = my_productos.filter (producto => producto.categoria === "camiseta")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("camisetas")
            break;

        case "ropa_interior":
            encontrado = my_productos.filter (producto => producto.categoria === "corpiño" || producto.categoria === "bombacha")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("ropa interior")
            break;

        case "medias":
            encontrado = my_productos.filter (producto => producto.categoria === "medias")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("medias")
            break;
        
        case "pantuflas":
            encontrado = my_productos.filter (producto => producto.categoria === "pantuflas")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("pantuflas")
            break;
    
        default:
            $("#productos_mostrados").empty()
            mostrar_productos(my_productos)
            $("#tienda_seccion_titulo").html("todos los productos")
            break;
    }
})

$("#ver_carrito").on("click", (e) => {
    e.preventDefault();
    crear_modal_carrito(carrito_compras)
})



