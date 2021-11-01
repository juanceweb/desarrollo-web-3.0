


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
    let modelos_modal = modelos.filter (modelo => modelo.id == producto.id)
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
                                                        <button type="button" class="reducir_cant btn btn-danger py-1 m-2" data-bs-toggle="popover" title="Popover title" data-bs-content="wololo">-</button>
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
        const talles = []
        modelo_final = undefined
        talles_modal = modelos_modal.filter (modelo => modelo.color == color)

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
    })


    $(`#talles_${producto.id}`).on("change", (e) => {
        cantidad = 0
        talle = e.target.value;
        modelo_final = undefined
        modelo_final = talles_modal.find(producto => producto.talle == talle)
        $(`#cantidad_${producto.id}`).html(`${cantidad}`)
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
        } else {
            $(`#agregar_carrito_${producto.id}`).attr("data-bs-dismiss","modal")
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
        return `Agregaste ${cantidad} producto al Carrito!`
    } else {
        return `Agregaste ${cantidad} productos al Carrito!`
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
    confirmar_cantidades()


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
            console.log("Hay producto en 0, no se puede confirmar la compra");
        } else {
            console.log("compra confirmada, gracias por elegirnos!");
        }
    })


    for (const producto of carrito) {
        $(`.aumentar_${producto.modelo_id}`).on("click", (e) => {
            e.preventDefault()
            let producto_encontrar = modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
            producto.cantidad = aumentar(producto_encontrar, producto.cantidad)
            $(`#${producto.modelo_id}`).html(`${producto.cantidad}`)
        })
    
    
        $(`.reducir_${producto.modelo_id}`).on("click", (e) => {
            e.preventDefault()
            let producto_encontrar = modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
            producto.cantidad =reducir(producto_encontrar, producto.cantidad)
            $(`#${producto.modelo_id}`).html(`${producto.cantidad}`)
        })
        
        $(`.eliminar_${producto.modelo_id}`).on("click", (e) => {
            e.preventDefault()
            let producto_encontrar = modelos.find (modelo => modelo.modelo_id == producto.modelo_id)
            carrito_compras = carrito_compras.filter (modelo => modelo.modelo_id != producto_encontrar.modelo_id)
            crear_modal_carrito(carrito_compras)
            $("#span_carrito").html(carrito_compras.length)
        }) 
        
        $(`#${producto.modelo_id}`).bind('DOMSubtreeModified', () => {
            cerrar_compra = 0
            confirmar_cantidades()
        })
    }
}


function confirmar_cantidades () {
    cerrar_compra = 0
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
        console.log("el carrito dice none");
    } else {
        $("#confirmar_carrito").attr("data-bs-dismiss","modal")
        console.log("el carrito dice sinene");
    }
}

function check_cantidad_carrito(carrito) {
    let items_carrito = ""
    if (carrito.length === 0) {
        return `<h5 class="text-center">Actualmente el Carrito esta vacio</h5>`
    } else {
        for (const producto of carrito) {
            items_carrito += `<div class="container-fluid">
                                <div class="row justify-content-md-center text-center">
                                    <div class="col col-lg-2 my-auto">
                                        <h5 class="text-capitalize">${producto.modelo_id} ${producto.producto}</h5>
                                    </div>
                                    <div class="col col-lg-2 text-center my-auto">
                                        <h5 class="text-capitalize">(${producto.color} - ${producto.talle})</h5>
                                    </div>
                                    <div class="col col-lg-2 justify-content-center my-auto">
                                        <button href="#" class="aumentar_${producto.modelo_id} btn btn-success py-1 m-2">+</button>
                                        <label id="${producto.modelo_id}">${producto.cantidad}</label>
                                        <button href="#" class="reducir_${producto.modelo_id} btn btn-danger py-1 m-2">-</button>
                                    </div>
                                    <div class="col col-lg-2 text-center my-auto">
                                        <h5>$${producto.precio}</h5> 
                                    </div>
                                    <div class="col col-lg-2 text-center my-auto">
                                    <button href="#" class="eliminar_${producto.modelo_id} btn btn-danger py-1 m-2">X</button>
                                    </div>
                                </div>
                            </div>`
        }
        return items_carrito
    }
}