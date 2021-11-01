

$(".busqueda").on( "click",(e) => {  
    e.preventDefault();
    console.log(e.target.id);
    if (e.target.id === "todos_productos") {
        $("#productos_mostrados").empty()
        mostrar_productos(productos)
    }else{
    const encontrado = productos.filter (producto => producto.categoria === e.target.id)
    $("#productos_mostrados").empty()
    mostrar_productos(encontrado)
    }
})

$("#ver_carrito").on("click", (e) => {
    e.preventDefault();
    crear_modal_carrito(carrito_compras)
})

