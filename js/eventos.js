



$(".busqueda").on( "click",(e) => {  
    e.preventDefault();
    let id_encontrado = e.target.id;
    buscar_categoria(id_encontrado)
})


$(".boton_ver_mas_inicio").on( "click",(e) => {  
    let id_encontrado = e.target.id;
    buscar_categoria(id_encontrado)
})


$("#ver_carrito").on("click", (e) => {
    e.preventDefault();
    crear_modal_carrito(carrito_compras)
})



$(document).ready(function () {
    if ("carrito" in localStorage) {
        const datos = JSON.parse(localStorage.getItem('carrito'))
        for (const literal of datos) {
            carrito_compras.push( new Modelo (literal.id, literal.modelo_id, literal.producto, literal.categoria, literal.descripcion, literal.precio, literal.color, literal.modelo_imagen, literal.talle, literal.stock, literal.cantidad))
        }
        $("#span_carrito").html(carrito_compras.length)
    }
    if ("categoria" in localStorage) {
        const cat = JSON.parse(localStorage.getItem('categoria'))
        buscar_categoria(cat)
    }
})



$(document).scroll(function () {
    let y = $(this).scrollTop();
    if (y >= 0) {
        $("#quienes_somos_1").removeClass("invisible")
        $("#quienes_somos_1").addClass("moveLeft")
        $("#quienes_somos_1").fadeIn();
    }
    if (y >= 200) {
        $("#quienes_somos_2").removeClass("invisible")
        $("#quienes_somos_2").addClass("moveRight")
        $("#quienes_somos_2").fadeIn();
    }
    if (y >= 400) {
        $("#quienes_somos_3").removeClass("invisible")
        $("#quienes_somos_3").addClass("moveLeft")
        $("#quienes_somos_3").fadeIn();
    }
});

