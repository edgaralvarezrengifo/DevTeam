import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import "./Ventas.css";
import { auth, db, logout } from "./firebase";
import NavBar from "./NavBar";
import NavBarLateral from "./NavBarLateral";
import {consultarDatabase,actualizarDocumentoDatabase,addDocumentoDatabase } from "./firebase";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Modal from 'react-bootstrap/modal'


function Productos() {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [rol, setRol] = useState("");
    const history = useHistory();
    const MySwal = withReactContent(Swal);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const fetchUserName = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
            setRol(data.rol);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) return history.replace("/");
        fetchUserName();
        if (rol === "Vendedor") return history.replace("/");
        postData()
    }, [user, loading, history, name, rol]);


    const [listaProductos, setListaProductos] = useState([])

    async function postData() {

        setListaProductos(await consultarDatabase('products'));

    };

    const [productoNuevo, setProductoNuevo] = useState({
        id: '',
        nombre: '',
        precio: '',
        cantidad: '',
        descripcion: ''
    })

    const [productoEditar, setProductoEditar] = useState({
        id: '',
        nombre: '',
        precio: '',
        cantidad: '',
        descripcion: ''
    })

    const [idEditado, setIdEditado] = useState('')


    const handleCrearNombre = (e) => {
        setProductoNuevo({
            id: productoNuevo.id,
            nombre: e.target.value,
            precio: productoNuevo.precio,
            cantidad: productoNuevo.cantidad,
            descripcion: productoNuevo.descripcion
        })
    }

    const handleCrearCantidad = (e) => {
        setProductoNuevo({
            id: productoNuevo.id,
            nombre: productoNuevo.nombre,
            precio: productoNuevo.precio,
            cantidad: e.target.value,
            descripcion: productoNuevo.descripcion
        })
    }

    const handleCrearPrecio = (e) => {
        setProductoNuevo({
            id: productoNuevo.id,
            nombre: productoNuevo.nombre,
            precio: e.target.value,
            cantidad: productoNuevo.cantidad,
            descripcion: productoNuevo.descripcion
        })
    }

    const handleCrearDescripcion = (e) => {
        setProductoNuevo({
            id: productoNuevo.id,
            nombre: productoNuevo.nombre,
            precio: productoNuevo.precio,
            cantidad: productoNuevo.cantidad,
            descripcion: e.target.value
        })
    }

    const handleCrearProducto = async () => {
        console.log(productoNuevo)

        setListaProductos([
            ...listaProductos,
            productoNuevo
        ])
        addDocumentoDatabase('products',productoNuevo);

        await MySwal.fire({
            title: <strong>Exito!</strong>,
            html: <i>Se creó el producto correctamente!</i>,
            icon: 'success'
          })

        setProductoNuevo({
            id: '',
            nombre: '',
            precio: '',
            cantidad: '',
            descripcion: ''
        })
    }

    const handleEditarNombre = (e) => {
        setIdEditado(productoEditar.id)
        setProductoEditar({
            id: productoEditar.id,
            nombre: e.target.value,
            precio: productoEditar.precio,
            cantidad: productoEditar.cantidad,
            descripcion: productoEditar.descripcion
        })
    }
    const handleEditarCantidad = (e) => {
        setIdEditado(productoEditar.id)
        setProductoEditar({
            id: productoEditar.id,
            nombre: productoEditar.nombre,
            precio: productoEditar.precio,
            cantidad: e.target.value,
            descripcion: productoEditar.descripcion
        })
    }
    const handleEditarPrecio = (e) => {
        setIdEditado(productoEditar.id)
        setProductoEditar({
            id: productoEditar.id,
            nombre: productoEditar.nombre,
            precio: e.target.value,
            cantidad: productoEditar.cantidad,
            descripcion: productoEditar.descripcion
        })
    }
    const handleEditarDescripcion = (e) => {
        setIdEditado(productoEditar.id)
        setProductoEditar({
            id: productoEditar.id,
            nombre: productoEditar.nombre,
            precio: productoEditar.precio,
            cantidad: productoEditar.cantidad,
            descripcion: e.target.value
        })
    }

    const handleEditarProducto = async () => {
        console.log(productoEditar)
        const listaTemporal = listaProductos.map((item) => {
            return item.id === idEditado ? productoEditar : item
        })
       
        let data=listaTemporal.find((item)=>{
            return item.id === idEditado ? productoEditar : item
          })
       // console.log(data)
        productoEditar.id=data.id
        actualizarDocumentoDatabase("products",data.id,productoEditar);
        setListaProductos(listaTemporal)
        await MySwal.fire({
            title: <strong>Exito!</strong>,
            html: <i>Se actualizó el producto correctamente!</i>,
            icon: 'success'
          })
    }

    const handleBuscarProducto = () => {

        const buscado = listaProductos.find((item) => {
            return item.id === idEditado
        })

        setProductoEditar(buscado)
    }

    const handleIdProductoBuscado = (e) => {
        setIdEditado(e.target.value)
    }


    return (

        <>
            <div>
                <NavBar />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <NavBarLateral />
                    <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="text-light">Productos</h1>
                        </div>

                        <div className="row">
                            <h2 className="headertekst text-light">Buscar Producto</h2>
                            <div className="col-6 container-fluid">
                                <div class="col-6 input-group mb-3">
                                    <input type="text" className="form-control" onChange={handleIdProductoBuscado} />
                                    <a role="button" type="submit" className="btn btn-dark btn-outline-danger" title="Buscar Usuario" data-toggle="modal" data-target="#editarProducto"
                                        onclick={handleBuscarProducto}
                                    >
                                        Buscar
                                    </a>
                                </div>

                                <div className="list-group list-group-checkable ">
                                    <div className="list-group">
                                        {
                                            listaProductos.map((p) => (

                                                <li className="list-group-item list-group-item-action flex-column align-items-start bg-dark text-light" key={p.id}>
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{p.nombre}</h5>
                                                        <small>{p.cantidad} unidades</small>
                                                    </div>
                                                    <p className="mb-1">{p.descripcion}</p>
                                                    <small>Costo: {p.precio}</small>
                                                    <div className="">
                                                    
                                                        <button type="submit" className="btn btn-dark btn-outline-danger" 
                                                            onClick={handleShow}
                                                        >
                                                            editar
                                                        </button>
                                                    </div>

                                                </li>
                                            ))
                                        }
                                    </div>
                                </div>


                            </div>
                            <div className="col-6 container">
                                <div className="container  bg-dark text-light">

                                    <h4 className="text-light pt-4">Registrar Producto</h4>

                                    <form>
                                        <div className="form-group mt-3">
                                            <label className="mb-2">Nombre:</label>
                                            <input type="text" className="form-control" onChange={handleCrearNombre} value={productoNuevo.nombre} />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label className="mb-2">Precio: </label>
                                            <input type="text" className="form-control" onChange={handleCrearPrecio} value={productoNuevo.precio} />
                                        </div>
                                        <div class="form-group mt-3">
                                            <label className="mb-2">Cantidad: </label>
                                            <input type="text" className="form-control" onChange={handleCrearCantidad} value={productoNuevo.cantidad} />
                                        </div>
                                        <div class="form-group mb-4 mt-3">
                                            <label className="mb-2">Descripcion: </label>
                                            <textarea className="form-control" rows="3" onChange={handleCrearDescripcion} value={productoNuevo.descripcion} />
                                        </div>
                                        <div className="pb-4">
                                            <a className="btn btn-dark btn-outline-danger" onClick={handleCrearProducto} >
                                                Guardar
                                            </a>
                                        </div>
                                    </form>
                                </div>
                                <hr />
                                <Modal  animation={false} show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                                    <Modal.Header className="bg-secondary text-light" closeButton>
                                        <Modal.Title>Editar producto</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="bg-dark text-light">
                                    <form>
                                                    <div className="form-group mt-3">
                                                        <label className="mb-2">Nombre:</label>
                                                        <input type="text" className="form-control" placeholder={productoEditar.nombre} onChange={handleEditarNombre} />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <label className="mb-2">Precio: </label>
                                                        <input type="text" className="form-control" placeholder={productoEditar.precio} onChange={handleEditarPrecio} />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <label className="mb-2">Cantidad: </label>
                                                        <input type="text" className="form-control" placeholder={productoEditar.cantidad} onChange={handleEditarCantidad} />
                                                    </div>
                                                    <div className="form-group pb-5 mt-3">
                                                        <label className="mb-2">Descripcion: </label>
                                                        <textarea className="form-control" rows="3" placeholder={productoEditar.descripcion} onChange={handleEditarDescripcion}></textarea>
                                                    </div>
                                                </form>
                                     
                                    </Modal.Body>
                                    <Modal.Footer className="bg-secondary text-light">
                                    <button type="button" className="close btn-dark" data-dismiss="modal"
                                                    aria-label="Close" onClick={handleEditarProducto}>Guardar Cambios</button>
                                               
                                    <button type="button" className="close btn-dark" onClick={handleClose}>
                                        Close
                                    </button>
                                
                                    </Modal.Footer>
                                </Modal>

                                {/* MODAL EDITAR A TRAVÉS DE LA BUSQUEDA */}

                                <div className="modal fade" id="buscarProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header bg-secondary text-light">
                                                <h5 className="modal-title" id="exampleModalLabel">EDITAR PRODUCTO</h5>
                                            </div>
                                            <div className="modal-body bg-dark text-light">
                                                <form>
                                                    <div class="form-group mt-3">
                                                        <label className="mb-2">Nombre:</label>
                                                        <input type="text" class="form-control" onChange={handleEditarNombre} />
                                                    </div>
                                                    <div class="form-group mt-3">
                                                        <label className="mb-2">Precio: </label>
                                                        <input type="text" class="form-control" onChange={handleEditarPrecio} />
                                                    </div>
                                                    <div class="form-group mt-3">
                                                        <label className="mb-2">Cantidad: </label>
                                                        <input type="text" class="form-control" onChange={handleEditarCantidad} />
                                                    </div>
                                                    <div class="form-group pb-5 mt-3">
                                                        <label className="mb-2">Descripcion: </label>
                                                        <textarea className="form-control" rows="3" onChange={handleEditarDescripcion}></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer bg-secondary">
                                                <button type="button" className="close btn-dark" data-dismiss="modal"
                                                    aria-label="Close" data-bs-toggle="modal" href= "#notificacionEditadoProducto" onclick={handleEditarProducto}>Guardar Cambios</button>
                                                <button type="button" className="close btn-dark" data-dismiss="modal"
                                                    aria-label="Close">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* MODAL EDITAR A TRAVÉS DEL BOTON */}

                                

                               
                                <div className="modal-dialog modal-lg ts-modal modal-dialog-centered" id="editarProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header bg-secondary text-light">
                                                <h5 className="modal-title" id="exampleModalLabel">EDITAR PRODUCTO</h5>
                                            </div>
                                            <div className="modal-body bg-dark text-light">
                                                <form>
                                                    <div className="form-group mt-3">
                                                        <label className="mb-2">Nombre:</label>
                                                        <input type="text" className="form-control" placeholder={productoEditar.nombre} onChange={handleEditarNombre} />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <label className="mb-2">Precio: </label>
                                                        <input type="text" className="form-control" placeholder={productoEditar.precio} onChange={handleEditarPrecio} />
                                                    </div>
                                                    <div className="form-group mt-3">
                                                        <label className="mb-2">Cantidad: </label>
                                                        <input type="text" className="form-control" placeholder={productoEditar.cantidad} onChange={handleEditarCantidad} />
                                                    </div>
                                                    <div className="form-group pb-5 mt-3">
                                                        <label className="mb-2">Descripcion: </label>
                                                        <textarea className="form-control" rows="3" placeholder={productoEditar.descripcion} onChange={handleEditarDescripcion}></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer bg-secondary">
                                                <button type="button"                                                                                                   
                                                onclick={handleEditarProducto}>Guardar Cambios</button>
                                                <button type="button" className="close btn-dark" data-dismiss="modal"
                                                    aria-label="Close">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal fade" id="registrarProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Producto registrado con éxito</h5>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="close btn-dark" data-dismiss="modal"
                                                    aria-label="Close">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal fade" id="notificacionEditadoProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Producto editado con éxito</h5>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="close btn-dark" data-dismiss="modal"
                                                    aria-label="Close">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="headertekst">

                                    <div className="col-6 input-group mb-3">


                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </div>

                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </>
    );
}
export default Productos;
