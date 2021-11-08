


// FUNCION QUE LLAMA A LA FUNCION QUE CREA LA VISUAL Y TAMBIEN CREA LA PAGINACION DE LOS PRODUCTOS EN "TIENDA ONLINE"
function mostrar_productos (productos) {
    // SE SACA CUANTAS PAGINAS DE PAGINACION SE NECESITAN, EN BASE AL ARRAY DE PRODUCTOS (CAMBIA EN BASE A LA CATEGORIA)
    let cant_paginas = Math.ceil(productos.length / len)
    let pagina_actual = 1

    // SE CREA LA VISUAL DE LOS PRODUCTOS
    mostrar_array_productos(productos)

    // SE LE ASIGNA DISPLAY NONE, A TODOS LOS PRODUCTOS EXCEPTO A LA CANTIDAD DELIMITADA QUE SE DEBE VER POR PAGINA
    $("#productos_mostrados .producto_creado:gt(" + (len - 1) + ")").addClass("d-none")

    // SE CREA LA PAGINACION
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

    // EVENTO QUE CAMBIA EL ESTADO DE PAGINA ACTIVA Y ACTIVA/DESACTIVA LOS BOTONES DE PREVIOUS Y NEXT
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

    // EVENTO QUE HACE QUE AL APRETAR NEXT, CAMBIE A LA SIGUIENTE PAGINA
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

    // EVENTO QUE HACE QUE AL APRETAR PREVIOUS, CAMBIE A LA PAGINA ANTERIOR
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

// FUNCION QUE AL CAMBIAR DE PAGINA, LE PONE DISPLAY NONE A TODOS LOS PRODUCTOS, Y LUEGO SE LO SACA, A LOS PRODUCTOS QUE DEBEN APARECER EN ESA PAGINA
function pagination_worker(pagina_actual) {
    $(".pagination li").removeClass("active")
    $("#productos_mostrados .producto_creado").addClass("d-none")

    let gran_total = len * pagina_actual;

    for (let i = gran_total - len; i < gran_total; i++) {
        $("#productos_mostrados .producto_creado:eq(" + (i) + ")").removeClass("d-none").hide().fadeIn(1000) 
    }
}



// FUNCION QUE CREA LA VISUAL DE LOS PRODUCTOS EN "TIENDA ONLINE"
function mostrar_array_productos(productos) {
    $("#productos_mostrados").hide().fadeIn(1000) 
    $("#productos_mostrados").append(`<h2 id="tienda_seccion_titulo" class="col-12 sectionArticulos__h2--format">todos los productos</h2>`)
    for (const producto of productos) {
        $("#productos_mostrados").append(`<div class="producto_creado col-12 col-md-6 col-xl-4 d-flex justify-content-center">
                                            <div class="card mb-4 text-center shadow-lg border border-danger">
                                                <img src="${producto.imagen}" class="card-img-top" alt="..." height="250px">
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



// FUNCION QUE CREA LA MODAL DE CIERTO PRODUCTO AL CLICKEAR EN EL, Y BUSCA LOS MODELOS DISPONIBLES
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

    // OBTENGO LOS DISTINTOS COLORES DISPONIBLES PARA ESE PRODUCTO
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

    // SE CREA LA MODAL DEL PRODUCTO, CON LAS OPCIONES DE COLORES DISPONIBLES
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
                                                <div class="col-lg-6 text-center">
                                                    <h3 class="modal__texto--titulo text-uppercase text-danger pt-5">${producto.producto}</h3>
                                                    <h5 class="pt-3">(${producto.categoria})</h5>
                                                    <h6 class="pt-3 fst-italic lh-sm m-2 p-2">${producto.descripcion}</h6>
                                                    <div class="container">
                                                        <div class="row pt-3">
                                                            <div class="col modal_color justify-content-end">
                                                                <h5 class="modal__productos--titulo m-2 me-4 text-danger">Color:</h5>
                                                            </div>
                                                            <div class="col py-1 modal_select justify-content-start">
                                                                <select class="my-1 me-5" id=colores_${producto.id}>
                                                                ${options_colores}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="row pt-3">
                                                            <div class="col modal_color">
                                                                <h5 class="modal__productos--titulo my-2 me-4 text-danger">Talle:</h5>
                                                            </div>
                                                            <div class="col py-1 modal_select">
                                                                <select class="my-1 me-5" id=talles_${producto.id}>
                                                                ${options_talles}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h4 class="pt-4 text-success modal__texto--titulo">$${producto.precio}</h4>
                                                    <div class="pt-4">
                                                        <button href="#" class="reducir_cant btn btn-danger py-1 m-2 disabled">-</button>
                                                        <label id="cantidad_${producto.id}" class="border bg-white px-2" size="1">${cantidad}</label>
                                                        <button href="#" class="aumentar_cant btn btn-success py-1 m-2 disabled">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer justify-content-center bg-dark">
                                        <button href="#" id="agregar_carrito_${producto.id}" class="btn btn-danger m-2 disabled">Agregar Carrito</button>
                                    </div>
                                </div>`)

    // EVENTO QUE AL SELECCIONAR UN COLOR, BUSCA LOS TALLES DISPONIBLES PARA ESE COLOR ESPECIFICO
    $(`#colores_${producto.id}`).on("change", (e) => {
        options_talles = `<option selected="selected" disabled>Seleccionar...</option>\n`
        cantidad = 0
        color = e.target.value
        const talles = []
        modelo_final = undefined
        talles_modal = modelos_modal.filter (modelo => modelo.color == color)
        imagen = talles_modal[0].modelo_imagen
        $(`#imagen_${producto.id}`).attr("src", imagen)

        // OBTENGO LOS DISTINTOS TALLES DE ESE COLOR
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


    // EVENTO QUE AL SELECCIONAR UN TALLE (SE OBTIENE EL MODELO DEFINITIVO) Y DESBLOQUEA LA POSIBILIDAD DE AUMENTAR O BAJAR LA CANTIDAD A METER AL CARRITO
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


    // EVENTO QUE AL APRETAR EN "+" LLAMA A LA FUNCION QUE CHEQUEA EL STOCK Y AUMENTA EN 1 LA CANTIDAD SELECCIONADA (NO PERMITE QUE PASE DEL STOCK)
    $(".aumentar_cant").on("click", (e) => {
        e.preventDefault()
        if (modelo_final == undefined) {
            //pass
        } else {
            cantidad= aumentar(modelo_final, cantidad)
        $(`#cantidad_${producto.id}`).html(`${cantidad}`)
        }
    })


    // EVENTO QUE AL APRETAR "-" LLAMA A LA FUNCION QUE CHEQUEA EL STOCK Y REDUCE EN 1 LA CANTIDAD SELECCIONADA (NO PERMITE QUE BAJE DE 0)
    $(".reducir_cant").on("click", (e) => {
        e.preventDefault()
        if (modelo_final == undefined) {
            //pass
        } else {
            cantidad = reducir (modelo_final, cantidad)
            $(`#cantidad_${producto.id}`).html(`${cantidad}`)
        }
    })


    // EVENTO QUE LE ASIGNA EL ATRIBUTO DE DISMISS MODAL AL BOTON DE AGREGAR CARRITO SOLO CUANDO HAY UN PRODUCTO CORRECTO SELECCIONADO
    $(`#cantidad_${producto.id}`).bind('DOMSubtreeModified', () => {
        if (color === undefined || talle === undefined || cantidad === 0) {
            $(`#agregar_carrito_${producto.id}`).attr("data-bs-dismiss","none")
            $(`#agregar_carrito_${producto.id}`).addClass("disabled")
        } else {
            $(`#agregar_carrito_${producto.id}`).attr("data-bs-dismiss","modal")
            $(`#agregar_carrito_${producto.id}`).removeClass("disabled")
        }
    })


    // EVENTO QUE AL APRETAR EL BOTON DE "AGREGAR CARRITO" AGREGA EL PRODUCTO AL CARRITO, Y MUESTRA UN TOAST
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



// FUNCION QUE CORROBORA QUE AL AUMENTAR LA CANTIDAD, NO SE PASE DEL STOCK DE ESE MODELO
function aumentar(modelo, cantidad) {
    if (modelo.aumentar_cantidad(cantidad)) {
        cantidad += 1
        return cantidad
    } else {
        cantidad = cantidad

        return cantidad
    }
}



// FUNCION QUE CORROBORA QUE AL REDUCIR LA CANTIDAD, NO SE BAJE DE 0
function reducir (modelo, cantidad) {
    if (modelo.reducir_cantidad(cantidad)) {
        cantidad -= 1
        return cantidad
    } else {
        cantidad = cantidad
        return cantidad
    }
}



// FUNCION QUE MUESTRA EL TOAST, CON UN MENSAJE ESPECIFICO
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



// FUNCION QUE CREA EL CUERPO DEL TOAST, SI ES UN NUMERO, LO TOMA COMO QUE SE AGREGO ALGO AL CARRITO, SI ES UN TEXTO, IMPRIME EL TEXTO
function check_cantidad_toast (cantidad) {
    if (cantidad === 1) {
        return `Agregaste ${cantidad} articulo de 1 producto al Carrito!`
    } else if (cantidad > 1) {
        return `Agregaste ${cantidad} articulos de 1 producto al Carrito!`
    } else {
        return cantidad
    }
}



// FUNCION QUE CHEQUEA QUE EL PRODUCTO AGREGADO NO ESTE YA EN EL CARRITO, DE SER ASI, MODIFICA LAS CANTIDADES DEL PRODUCTO SELECCIONADO POR LAS NUEVAS, Y SINO, LO AGREGA 
function agregar_carrito(modelo, cantidad) {
    let buscar_carrito = carrito_compras.find (producto => producto.modelo_id == modelo.modelo_id)
    if (buscar_carrito == undefined) {
        modelo.cantidad = cantidad
        carrito_compras.push(modelo)
        $("#span_carrito").html(carrito_compras.length)
    } else {
        buscar_carrito.cantidad = cantidad
    }
    localStorage.setItem("carrito", JSON.stringify(carrito_compras))
}



// FUNCION QUE CREA LA MODAL DEL CARRITO, EN BASE AL ARRAY DEL CARRITO
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


    // EVENTO QUE NO PERMITE COMPRAR SI ALGUNO DE LOS ELEMENTOS EN EL CARRITO TIENE CANTIDAD 0, Y SI LA COMPRA ES CORRECTA, REDUCE EL STOCK DE LOS MODELOS COMPRADOS
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
                let producto_encontrar = my_modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
                
                producto_encontrar.stock = producto_encontrar.stock - producto.cantidad
                carrito_compras = carrito_compras.filter (modelo => modelo.modelo_id != producto_encontrar.modelo_id)
                $("#span_carrito").html(carrito_compras.length)
            }
            localStorage.setItem("carrito", JSON.stringify(carrito_compras))
            show_toast("Gracias por su Compra!!")
        }
    })


    // EVENTO QUE PERMITE AUMENTAR LA CANTIDAD DEL PRODUCTO DIRECTAMENTE EN EL CARRITO, SIN PASAR DEL STOCK 
    for (const producto of carrito) {
        $(`.aumentar_${producto.modelo_id}`).on("click", (e) => {
            e.preventDefault()
            let producto_encontrar = my_modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
            producto.cantidad = aumentar(producto_encontrar, producto.cantidad)
            $(`#${producto.modelo_id}`).html(`${producto.cantidad}`)
            $(`#subtotal_${producto.modelo_id}`).html(`$${producto.cantidad*producto.precio}`)
            localStorage.setItem("carrito", JSON.stringify(carrito_compras))
            crear_modal_carrito(carrito_compras)
        })
    
    
        // EVENTO QUE PERMITE REDUCIR LA CANTIDAD DEL PRODUCTO DIRECTAMENTE EN EL CARRITO, SIN BAJAR DE 0
        $(`.reducir_${producto.modelo_id}`).on("click", (e) => {
            e.preventDefault()
            let producto_encontrar = my_modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
            producto.cantidad =reducir(producto_encontrar, producto.cantidad)
            $(`#${producto.modelo_id}`).html(`${producto.cantidad}`)
            $(`#subtotal_${producto.modelo_id}`).html(`$${producto.cantidad*producto.precio}`)
            localStorage.setItem("carrito", JSON.stringify(carrito_compras))
            crear_modal_carrito(carrito_compras)
        })
        

        // EVENTO QUE PERMITE ELIMINAR UN PRODUCTO DEL CARRITO
        $(`.eliminar_${producto.modelo_id}`).on("click", (e) => {
            e.preventDefault()
            let producto_encontrar = my_modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
            carrito_compras = carrito_compras.filter (modelo => modelo.modelo_id != producto_encontrar.modelo_id)
            crear_modal_carrito(carrito_compras)
            localStorage.setItem("carrito", JSON.stringify(carrito_compras))
            $("#span_carrito").html(carrito_compras.length)
        }) 
        

        // EVENTO QUE LLAMA A UNA FUNCION, QUE SI ALGUN PRODUCTO ESTA EN CANTIDAD 0, BLOQUEA EL BOTON DE CARRITO
        $(`#${producto.modelo_id}`).bind('DOMSubtreeModified', () => {
            cerrar_compra = 0
            confirmar_cantidades(cerrar_compra)
        })
    }
}


// FUNCION QUE CHEQUEA QUE SI ALGUN PRODUCTO EN EL CARRITO TIENE 0, BLOQUEA EL BOTON DE CONFIRMAR COMPRA
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



// FUNCION QUE CREA EL CUERPO DEL MODAL DEL CARRITO, SI ESTA VACIO, O SI TIENE PRODUCTOS DENTRO
function check_cantidad_carrito(carrito) {
    let items_carrito = ""
    let carrito_precio_total = 0
    if (carrito.length === 0) {
        return `<h5 class="text-center py-5">Actualmente el Carrito esta vacio</h5>`
    } else {
        for (const producto of carrito) {
            items_carrito += `<div class="container-fluid">
                                <div class="row border justify-content-md-center text-center py-2">
                                    <div class="col-12 col-md-2 col-lg-2 col-xl-1 text-center my-auto pb-2">
                                        <img src="${producto.modelo_imagen}" class="imagen_carrito border border-danger" alt="...">
                                    </div>
                                    <div class="col-12 col-md-10 col-lg-6 col-xl-5 my-auto">
                                        <h5 class="text-capitalize">${producto.producto}(${producto.color} - ${producto.talle})</h5>
                                    </div>
                                    <div class="col-12 col-lg-4 col-xl-2 text-center my-auto">
                                        <button href="#" class="reducir_${producto.modelo_id} btn btn-danger py-1 m-2">-</button>
                                        <label id="${producto.modelo_id}">${producto.cantidad}</label>
                                        <button href="#" class="aumentar_${producto.modelo_id} btn btn-success py-1 m-2">+</button>
                                    </div>
                                    <div class="col col-md-4 col-lg-3 col-xl-1 text-center my-auto">
                                        <h5>$${producto.precio}</h5> 
                                    </div>
                                    <div class="col col-md-2 col-lg-2 col-xl-1 text-center my-auto">
                                        <h5>=</h5> 
                                    </div>
                                    <div class="col col-md-4 col-lg-3 col-xl-1 text-start my-auto">
                                        <h5 id="subtotal_${producto.modelo_id}">$${producto.precio*producto.cantidad}</h5> 
                                    </div>
                                    <div class="col col-md-2 col-lg-4 col-xl-1 text-center my-auto">
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



// FUNCION QUE CHEQUEA LA CATEGORIA QUE SE PASA, Y MUESTRA LA CATEGORIA SELECCIONADA
function buscar_categoria(id) {
    let encontrado;

    switch (id) {
        case "camisones":
            encontrado = my_productos.filter (producto => producto.categoria === "camison")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("camisones")
            localStorage.setItem("categoria", JSON.stringify(id))
            break;

        case "pijamas":
            encontrado = my_productos.filter (producto => producto.categoria === "pijama")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("pijamas")
            localStorage.setItem("categoria", JSON.stringify(id))
            break;

        case "batas_monos":
            encontrado = my_productos.filter (producto => producto.categoria === "bata" || producto.categoria === "mono")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("batas/monos")
            localStorage.setItem("categoria", JSON.stringify(id))
            break;

        case "camisetas":
            encontrado = my_productos.filter (producto => producto.categoria === "camiseta")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("camisetas")
            localStorage.setItem("categoria", JSON.stringify(id))
            break;

        case "ropa_interior":
            encontrado = my_productos.filter (producto => producto.categoria === "corpiño" || producto.categoria === "bombacha")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("ropa interior")
            localStorage.setItem("categoria", JSON.stringify(id))
            break;

        case "medias":
            encontrado = my_productos.filter (producto => producto.categoria === "medias")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("medias")
            localStorage.setItem("categoria", JSON.stringify(id))
            break;
        
        case "pantuflas":
            encontrado = my_productos.filter (producto => producto.categoria === "pantuflas")
            $("#productos_mostrados").empty()
            mostrar_productos(encontrado)
            $("#tienda_seccion_titulo").html("pantuflas")
            localStorage.setItem("categoria", JSON.stringify(id))
            break;

        default:
            $("#productos_mostrados").empty()
            mostrar_productos(my_productos)
            $("#tienda_seccion_titulo").html("todos los productos")
            localStorage.setItem("categoria", JSON.stringify(id))
            break;
    }
}