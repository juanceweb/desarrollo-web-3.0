


function mostrar_productos (productos) {
    let cant_paginas = Math.ceil(productos.length / len)
    let pagina_actual = 1

    mostrar_array_productos(productos)

    $("#productos_mostrados .producto_creado:gt(" + (len - 1) + ")").addClass("d-none")

    $("#productos_mostrados").append(`<nav aria-label="Page navigation example">
                                        <ul id=pagination_pages class="pagination justify-content-center">
                                            <li id="pag_prev" class="page-item disabled"><button class="page-link">Previous</button></li>
                                            <li id="pag_1" class="page-item current_page active"><button class="page-link">1</button></li>
                                        </ul>
                                    </nav>`)

    for (let i = 2; i <= cant_paginas; i++) {
        $("#pagination_pages").append(`<li id="pag_${i}" class="page-item current_page"><button class="page-link">${i}</button></li>`)
    }
    
    if (cant_paginas === 1) {
        $("#pagination_pages").append(`<li id="pag_next" class="page-item disabled"><button class="page-link">Next</button></li>`)
    } else {
        $("#pagination_pages").append(`<li id="pag_next" class="page-item"><button class="page-link">Next</button></li>`)
    }

    $(".current_page").on("click", (e) => {
        e.preventDefault();
        if ($(e.currentTarget).hasClass("active")) {
            // pass
        } else {
            pagina_actual = $(`#${e.currentTarget.id}`).index();

            pagination_worker(pagina_actual)

            $(e.currentTarget).addClass("active")
            
            if (pagina_actual == cant_paginas) {
                $("#pag_next").addClass("disabled")
            } else {
                $("#pag_next").removeClass("disabled")
            }

            if (pagina_actual == 1) {
                $("#pag_prev").addClass("disabled")
            } else {
                $("#pag_prev").removeClass("disabled")
            }
        }
    })

    $("#pag_next").on("click", (e) => {
        e.preventDefault();
        if ($(e.currentTarget).hasClass("disabled")) {
            // pass
        } else {
            pagina_actual++;
            pagination_worker(pagina_actual)

            $(".pagination li:eq(" + (pagina_actual) + ")").addClass("active")
            $("#pag_prev").removeClass("disabled")

            if (pagina_actual == cant_paginas) {
                $("#pag_next").addClass("disabled")
            }
        }
    })

    $("#pag_prev").on("click", (e) => {     
        e.preventDefault();
        if ($(e.currentTarget).hasClass("disabled")) {
            // pass
        } else {
            pagina_actual--;
            pagination_worker(pagina_actual)

            $(".pagination li:eq(" + (pagina_actual) + ")").addClass("active")
            $("#pag_next").removeClass("disabled")

            if (pagina_actual == 1) {
                $("#pag_prev").addClass("disabled")
            }
        }
    })
}

function pagination_worker(pagina_actual) {
    $(".pagination li").removeClass("active")
    $("#productos_mostrados .producto_creado").addClass("d-none")

    let gran_total = len * pagina_actual;

    for (let i = gran_total - len; i < gran_total; i++) {
        $("#productos_mostrados .producto_creado:eq(" + (i) + ")").removeClass("d-none").hide().fadeIn(1000) 
    }
}


function mostrar_array_productos(productos) {
    $("#productos_mostrados").hide().fadeIn(1000) 
    $("#productos_mostrados").append(`<h2 id="tienda_seccion_titulo" class="col-12 sectionArticulos__h2--format">todos los productos</h2>`)
    for (const producto of productos) {
        $("#productos_mostrados").append(`<div class="producto_creado col-12 col-md-6 col-xl-4 d-flex justify-content-center">
                                            <div class="card m-5 text-center shadow-lg border border-danger" style="width: 18rem;">
                                                <img src="${producto.imagen}" class="card-img-top" alt="..." height="350px">
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
    let imagen = producto.imagen
    let cantidad = 0
    let options_colores = `<option selected="selected" disabled>Seleccionar...</option>\n`
    let options_talles = `<option selected="selected" disabled>Seleccionar...</option>\n`
    producto.stock = undefined
    let modelos_modal = my_modelos.filter (modelo => modelo.id == producto.id)
    let talles_modal;
    let modelo_final;
    const colores = []

    for (const modelo of modelos_modal) {
        if (colores.find (color => color == modelo.color)) {
            //pass
        } else {
            colores.push(modelo.color)
        }
    }

    for (const color of colores) {
        options_colores += `<option class="text-uppercase" value="${color}">${color.toUpperCase()}</option>\n`
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
                                                <div class="col-md-6 text-center">
                                                    <img id=imagen_${producto.id} src="${imagen}" class="border border-danger imagen_modal" alt="...">
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
                                                        <button href="#" class="aumentar_cant btn btn-success py-1 m-2 disabled">+</button>
                                                        <label id="cantidad_${producto.id}" class="border bg-white px-2" size="1">${cantidad}</label>
                                                        <button type="button" class="reducir_cant btn btn-danger py-1 m-2 disabled" data-bs-toggle="popover" title="Popover title" data-bs-content="wololo">-</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer justify-content-center bg-dark">
                                        <button href="#" id="agregar_carrito_${producto.id}" class="btn btn-danger m-2 disabled">Agregar Carrito</button>
                                    </div>
                                </div>`)

    $(`#colores_${producto.id}`).on("change", (e) => {
        options_talles = `<option selected="selected" disabled>Seleccionar...</option>\n`
        cantidad = 0
        color = e.target.value
        const talles = []
        modelo_final = undefined
        talles_modal = modelos_modal.filter (modelo => modelo.color == color)
        imagen = talles_modal[0].modelo_imagen
        $(`#imagen_${producto.id}`).attr("src", imagen)

        for (const modelo of talles_modal) {
            talles.push(modelo.talle)
        }

        for (const talle of talles) {
            options_talles += `<option class="text-uppercase" value="${talle}">${talle.toUpperCase()}</option>\n`
        }

        $(`#talles_${producto.id}`).empty()
        $(`#talles_${producto.id}`).append(options_talles)
        $(`#cantidad_${producto.id}`).html(`${cantidad}`)
        producto.stock = undefined
        $(".aumentar_cant").addClass("disabled")
        $(".reducir_cant").addClass("disabled")
    })


    $(`#talles_${producto.id}`).on("change", (e) => {
        cantidad = 0
        talle = e.target.value;
        modelo_final = undefined
        modelo_final = talles_modal.find(producto => producto.talle == talle)
        if (modelo_final.stock === 0) {
            $(`#cantidad_${producto.id}`).html("Sin Stock")
            $(".aumentar_cant").addClass("disabled")
            $(".reducir_cant").addClass("disabled")
        } else {
            $(`#cantidad_${producto.id}`).html(`${cantidad}`)
            $(".aumentar_cant").removeClass("disabled")
            $(".reducir_cant").removeClass("disabled")
        }
    })


    $(".aumentar_cant").on("click", (e) => {
        e.preventDefault()
        if (modelo_final == undefined) {
            //pass
        } else {
            cantidad= aumentar(modelo_final, cantidad)
        $(`#cantidad_${producto.id}`).html(`${cantidad}`)
        }
    })


    $(".reducir_cant").on("click", (e) => {
        e.preventDefault()
        if (modelo_final == undefined) {
            //pass
        } else {
            cantidad = reducir (modelo_final, cantidad)
            $(`#cantidad_${producto.id}`).html(`${cantidad}`)
        }
    })


    $(`#cantidad_${producto.id}`).bind('DOMSubtreeModified', () => {
        if (color === undefined || talle === undefined || cantidad === 0) {
            $(`#agregar_carrito_${producto.id}`).attr("data-bs-dismiss","none")
            $(`#agregar_carrito_${producto.id}`).addClass("disabled")
        } else {
            $(`#agregar_carrito_${producto.id}`).attr("data-bs-dismiss","modal")
            $(`#agregar_carrito_${producto.id}`).removeClass("disabled")
        }
    })

    $(`#agregar_carrito_${producto.id}`).on ("click", (e) => {
        e.preventDefault();
        if (color === undefined || talle === undefined || cantidad === 0) {
            //pass
        } else {
            agregar_carrito(modelo_final, cantidad);
            show_toast(cantidad)
        }
        
    })
}

function aumentar(modelo, cantidad) {
    if (modelo.aumentar_cantidad(cantidad)) {
        cantidad += 1
        return cantidad
    } else {
        cantidad = cantidad

        return cantidad
    }
}

function reducir (modelo, cantidad) {
    if (modelo.reducir_cantidad(cantidad)) {
        cantidad -= 1
        return cantidad
    } else {
        cantidad = cantidad
        return cantidad
    }
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
        return `Agregaste ${cantidad} articulo de 1 producto al Carrito!`
    } else {
        return `Agregaste ${cantidad} articulos de 1 producto al Carrito!`
    }
}


function agregar_carrito(modelo, cantidad) {
    let buscar_carrito = carrito_compras.find (producto => producto.modelo_id == modelo.modelo_id)
    if (buscar_carrito == undefined) {
        modelo.cantidad = cantidad
        carrito_compras.push(modelo)
        $("#span_carrito").html(carrito_compras.length)
    } else {
        modelo.cantidad = cantidad
    }
}


function crear_modal_carrito(carrito) {
    let cuerpo_carrito = check_cantidad_carrito(carrito)
    let cerrar_compra= 0

    $("#modal_carrito").empty()
    $("#modal_carrito").append(`<div class="modal-content modal__productos">
                                    <div class="modal-header bg-danger">
                                        <h3 class="modal-title text-white text-uppercase modal__productos--titulo" id="exampleModalLabel">Carrito</h3>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div id="carrito_cuerpo" class="col">
                                                ${cuerpo_carrito}
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                    <div class="modal-footer justify-content-center bg-dark">
                                        <button id="confirmar_carrito" class="btn btn-danger m-2" data-bs-dismiss="modal">Confirmar Compra</button>
                                    </div>
                                </div>`)
    confirmar_cantidades(cerrar_compra)


    $("#confirmar_carrito").on ("click", (e) => {
        e.preventDefault();
        let confirmar= 0
        if (carrito_compras.length === 0) {
            confirmar +=1
        } else {
            for (const modelo of carrito_compras) {
                if (modelo.cantidad == 0) {
                    confirmar += 1
                } else {
                    // pass
                }        
            }
        }
        if (confirmar >= 1) {
            // pass
        } else {
            for (const producto of carrito_compras) {
                producto.stock = producto.stock - producto.cantidad;
                let producto_encontrar = my_modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
                carrito_compras = carrito_compras.filter (modelo => modelo.modelo_id != producto_encontrar.modelo_id)
                $("#span_carrito").html(carrito_compras.length)
            }
        }
    })


    for (const producto of carrito) {
        $(`.aumentar_${producto.modelo_id}`).on("click", (e) => {
            e.preventDefault()
            let producto_encontrar = my_modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
            producto.cantidad = aumentar(producto_encontrar, producto.cantidad)
            $(`#${producto.modelo_id}`).html(`${producto.cantidad}`)
            $(`#subtotal_${producto.modelo_id}`).html(`$${producto.cantidad*producto.precio}`)
            crear_modal_carrito(carrito_compras)
        })
    
    
        $(`.reducir_${producto.modelo_id}`).on("click", (e) => {
            e.preventDefault()
            let producto_encontrar = my_modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
            producto.cantidad =reducir(producto_encontrar, producto.cantidad)
            $(`#${producto.modelo_id}`).html(`${producto.cantidad}`)
            $(`#subtotal_${producto.modelo_id}`).html(`$${producto.cantidad*producto.precio}`)
            crear_modal_carrito(carrito_compras)
        })
        
        $(`.eliminar_${producto.modelo_id}`).on("click", (e) => {
            e.preventDefault()
            let producto_encontrar = my_modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
            carrito_compras = carrito_compras.filter (modelo => modelo.modelo_id != producto_encontrar.modelo_id)
            crear_modal_carrito(carrito_compras)
            $("#span_carrito").html(carrito_compras.length)
        }) 
        
        $(`#${producto.modelo_id}`).bind('DOMSubtreeModified', () => {
            cerrar_compra = 0
            confirmar_cantidades(cerrar_compra)
        })
    }
}


function confirmar_cantidades (compra) {
    cerrar_compra = compra
    if (carrito_compras.length === 0) {
        cerrar_compra +=1
    } else {
        for (const modelo of carrito_compras) {
            if (modelo.cantidad == 0) {
                cerrar_compra += 1
            } else {
                // pass
            }        
        }
    }
    if (cerrar_compra >= 1) {
        $("#confirmar_carrito").attr("data-bs-dismiss","none")
        $("#confirmar_carrito").addClass("disabled")
    } else {
        $("#confirmar_carrito").attr("data-bs-dismiss","modal")
        $("#confirmar_carrito").removeClass("disabled")
    }
}

function check_cantidad_carrito(carrito) {
    let items_carrito = ""
    let carrito_precio_total = 0
    if (carrito.length === 0) {
        return `<h5 class="text-center py-5">Actualmente el Carrito esta vacio</h5>`
    } else {
        for (const producto of carrito) {
            items_carrito += `<div class="container-fluid">
                                <div class="row border justify-content-md-center text-center py-2">
                                    <div class="col col-lg-2 text-center my-auto">
                                        <img src="${producto.modelo_imagen}" class="imagen_carrito border border-danger" alt="...">
                                    </div>
                                    <div class="col col-lg-2 my-auto">
                                        <h5 class="text-capitalize">${producto.producto}</h5>
                                    </div>
                                    <div class="col col-lg-2 text-center my-auto">
                                        <h5 class="text-capitalize">(${producto.color} - ${producto.talle})</h5>
                                    </div>
                                    <div class="col col-lg-2 justify-content-center my-auto">
                                        <button href="#" class="aumentar_${producto.modelo_id} btn btn-success py-1 m-2">+</button>
                                        <label id="${producto.modelo_id}">${producto.cantidad}</label>
                                        <button href="#" class="reducir_${producto.modelo_id} btn btn-danger py-1 m-2">-</button>
                                    </div>
                                    <div class="col col-lg-1 text-center my-auto">
                                        <h5>$${producto.precio}</h5> 
                                    </div>
                                    <div class="col col-lg-1 text-center my-auto">
                                        <h5>=</h5> 
                                    </div>
                                    <div class="col col-lg-1 text-center my-auto">
                                        <h5 id="subtotal_${producto.modelo_id}">$${producto.precio*producto.cantidad}</h5> 
                                    </div>
                                    <div class="col col-lg-1 text-center my-auto">
                                    <button href="#" class="eliminar_${producto.modelo_id} btn btn-danger py-1 m-2">X</button>
                                    </div>
                                </div>
                            </div>`
            carrito_precio_total += parseInt(producto.precio*producto.cantidad)
        }
        items_carrito += `<hr>
                            <div class="container-fluid">
                                <div class="row border py-2 justify-content-md-end">
                                    <div class="col col-lg-2 my-auto">
                                        <h5> Total Carrito: </h5>
                                    </div>
                                    <div class="col col-lg-2 my-auto">
                                        <h5>$${carrito_precio_total}</h5>
                                    </div>
                                </div>
                            </div>
                            `
        return items_carrito
    }
}