


// $("#registro_producto").on("submit", (event) => {
//     event.preventDefault();
//     event.target;
//     const inputs = registro_producto.children;
//     if (inputs[1].value == "" || inputs[3].value == "" || inputs[5].value == "" || inputs[7].value == ""){
//         console.log("se dejo un campo en blanco")
//     }else {
//     productos.push (new Producto (inputs[1].value,inputs[3].value,inputs[5].value,inputs[7].value))
//     productos_creados.innerHTML = ""
//     mostrar_productos(productos)
//     }
// })


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