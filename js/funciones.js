


function mostrar_productos (productos) {
    $("#productos_mostrados").hide().fadeIn(1000) 
    $("#productos_mostrados").append(`<h2 class="col-12 sectionArticulos__h2--format">todos los productos</h2>`)
    for (const producto of productos) {
        $("#productos_mostrados").append(`<div class="col-12 col-md-6 col-xl-4 d-flex justify-content-center">
                                            <div class="card m-5 text-center shadow-lg border border-danger" style="width: 18rem;">
                                                <img src="../media/usuario_vacio.png" class="card-img-top" alt="...">
                                                <div class="card-body bg-dark">
                                                    <h5 class="card-title text-uppercase text-white">${producto.producto}</h5>
                                                    <h6 class="card-text text-success">$${producto.precio}</h6>
                                                    <a href="#" id="ver_mas_${producto.id}" class="btn btn-danger m-2" data-bs-toggle="modal" data-bs-target="#modal1">Ver Mas</a>
                                                </div>
                                            </div>
                                        </div>`)


        $(`#ver_mas_${producto.id}`).on("click", (e) => {
            e.preventDefault();
            crear_modal_producto(producto)
        })
    }
}

function crear_modal_producto(producto) {
    let color;
    let talle;
    let cantidad = 0
    let options_colores = `<option selected="selected" disabled>Seleccionar...</option>\n`
    let options_talles = `<option selected="selected" disabled>Seleccionar...</option>\n`
    producto.stock = undefined

    for (const color of producto.traer_colores()) {
        options_colores += `<option value="${color}">${color}</option>\n`
    }

    $("#modal_productos").empty()
    $("#modal_productos").append(`<div class="modal-content modal__productos">
                                    <div class="modal-header bg-danger">
                                        <h3 class="modal-title text-white text-uppercase modal__productos--titulo" id="exampleModalLabel">${producto.producto}</h3>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <img src="../media/usuario_vacio.png" class="card-img-top" alt="...">
                                                </div>
                                                <div class="col-md-6 text-center">
                                                    <h3 class="modal__texto--titulo text-uppercase text-danger pt-5">${producto.producto}</h3>
                                                    <h5 class="pt-3">(${producto.categoria})</h5>
                                                    <h6 class="pt-3 fst-italic lh-sm m-2 p-2">${producto.descripcion}</h6>
                                                    <div class="container">
                                                        <div class="row pt-3">
                                                            <div class="col d-flex justify-content-end">
                                                                <h5 class="modal__productos--titulo m-2 me-4 text-danger">Color:</h5>
                                                            </div>
                                                            <div class="col py-1 d-flex justify-content-start">
                                                                <select class="my-1 me-5" id=colores_${producto.id}>
                                                                ${options_colores}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="row pt-3">
                                                            <div class="col d-flex justify-content-end">
                                                                <h5 class="modal__productos--titulo my-2 me-4 text-danger">Talle:</h5>
                                                            </div>
                                                            <div class="col py-1 d-flex justify-content-start">
                                                                <select class="my-1 me-5" id=talles_${producto.id}>
                                                                ${options_talles}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h4 class="pt-4 text-success modal__texto--titulo">$${producto.precio}</h4>
                                                    <div class="pt-4">
                                                        <button href="#" class="aumentar_cant btn btn-success py-1 m-2">+</button>
                                                        <label id="cantidad_${producto.id}" class="border bg-white px-2" size="1">${cantidad}</label>
                                                        <button href="#" class="reducir_cant btn btn-danger py-1 m-2">-</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer justify-content-center bg-dark">
                                        <button href="#" id="agregar_carrito_${producto.id}" class="btn btn-danger m-2">Agregar Carrito</button>
                                    </div>
                                </div>`)


    $(`#colores_${producto.id}`).on("change", (e) => {
        options_talles = `<option selected="selected" disabled>Seleccionar...</option>\n`
        cantidad = 0
        color = e.target.value
        for (const talle of producto.traer_talles(e.target.value)) {
            options_talles += `<option value="${talle}">${talle}</option>\n`
        }
        $(`#talles_${producto.id}`).empty()
        $(`#talles_${producto.id}`).append(options_talles)
        $(`#cantidad_${producto.id}`).html(`${cantidad}`)
        producto.stock = undefined
    })


    $(`#talles_${producto.id}`).on("change", (e) => {
        cantidad = 0
        talle = e.target.value;
        producto.traer_stock(color, talle)
        $(`#cantidad_${producto.id}`).html(`${cantidad}`)
    })


    $(".aumentar_cant").on("click", (e) => {
        e.preventDefault()
        if (producto.aumentar_cantidad(cantidad)) {
            cantidad += 1
            console.log(cantidad);
        } else {
            cantidad = cantidad
            console.log(cantidad);
        }
        $(`#cantidad_${producto.id}`).html(`${cantidad}`)
    })


    $(".reducir_cant").on("click", (e) => {
        e.preventDefault()
        if (producto.reducir_cantidad(cantidad)) {
            cantidad -= 1
            console.log(cantidad);
        } else {
            cantidad = cantidad
            console.log(cantidad);
        }
        $(`#cantidad_${producto.id}`).html(`${cantidad}`)
    })

    $(`#cantidad_${producto.id}`).bind('DOMSubtreeModified', (e) => {
        console.log(e.target.id)
        if (color === undefined || talle === undefined || cantidad === 0) {
            $(`#agregar_carrito_${producto.id}`).attr("data-bs-dismiss","none")
            console.log($(`#agregar_carrito_${producto.id}`).data("bs-dismiss"))
        } else {
            $(`#agregar_carrito_${producto.id}`).attr("data-bs-dismiss","modal")
            console.log($(`#agregar_carrito_${producto.id}`).data("bs-dismiss"))
        }
    })

    $(`#agregar_carrito_${producto.id}`).on ("click", (e) => {
        e.preventDefault();
        if (color === undefined || talle === undefined || cantidad === 0) {
            console.log("ERROR");
        } else {
            agregar_carrito(producto.id, color, talle, cantidad);
            show_toast(cantidad)
        }
        
    })
}


function show_toast (cantidad) {
    let cuerpo_toast = check_cantidad_toast(cantidad)
    
    $("#live_toast").empty()
    $("#live_toast").append(`<div class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <img src="../media/gift.png" height=20px class="rounded me-2" alt="...">
                                    <strong class="me-auto">Lenceria Maria Maria</strong>
                                    <small>1 mins ago</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    ${cuerpo_toast}
                                </div>
                            </div>`)
    $(".toast").toast("show")
}


function check_cantidad_toast (cantidad) {
    if (cantidad === 1) {
        return `Agregaste ${cantidad} producto al Carrito!`
    } else {
        return `Agregaste ${cantidad} productos al Carrito!`
    }
}


function agregar_carrito(id, color, talle, cantidad) {
    let producto_encontrar = productos.find (producto => producto.id == id)
    let agregar = producto_encontrar.subir_a_carrito(color, talle, cantidad)
    carrito_compras.push(agregar)
    console.log(carrito_compras);
}


function crear_modal_carrito(carrito) {
    let cuerpo_carrito = check_cantidad_carrito(carrito)

    $("#modal_carrito").empty()
    $("#modal_carrito").append(`<div class="modal-content modal__productos">
                                    <div class="modal-header bg-danger">
                                        <h3 class="modal-title text-white text-uppercase modal__productos--titulo" id="exampleModalLabel">Carrito</h3>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col">
                                                ${cuerpo_carrito}
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                    <div class="modal-footer justify-content-center bg-dark">
                                        <button class="btn btn-danger m-2 ">Confirmar Compra</button>
                                    </div>
                                </div>`)
}


function check_cantidad_carrito(carrito) {
    let items_carrito = ""
    if (carrito.length === 0) {
        return `<h5 class=text-center>Actualmente el Carrito esta vacio</h5>`
    } else {
        for (const producto of carrito) {
            items_carrito += `<h5>${producto.id} ${producto.producto} Color:${producto.color} Talle: ${producto.talle} Cantidad: ${producto.cantidad} Precio: $${producto.precio}</h5>\n`
        }
        return items_carrito
    }
}