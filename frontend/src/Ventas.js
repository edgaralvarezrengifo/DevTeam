import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import "./Ventas.css";
import { auth, db, logout } from "./firebase";
import NavBar from "./NavBar";
import NavBarLateral from "./NavBarLateral";
import { consultarDatabase, actualizarDocumentoDatabase } from "./firebase";
import imgproductos from "./productos.png"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function Ventas() {
    const [usuarios, setUsuarios] = React.useState([]); 
   const MySwal = withReactContent(Swal);
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [productos, setProdutos] = useState([]);
    const [productossele, setProdutossele] = useState([]);
    const [productoNuevo, setProductoNuevo] = useState({
        id: '',
        nombre: '',
        precio: '',
        cantidad: '',
        descripcion: ''
    })

    const handleAgregarProducto =  () => {
     
        console.log(productoNuevo)
       
        setProdutossele([
            ...productossele,
            productoNuevo
        ])
       

    }
    const handlerGuardarVenta = async () => {
     
        await MySwal.fire({
            title: <strong>Exito!</strong>,
            html: <i>Se creó la venta correctamente!</i>,
            icon: 'success'
          })
       

    }

    async function postData() {

        setListaProductos(await consultarDatabase('products'));

    };
    const history = useHistory();

    const fetchUserName = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            console.log(data)
            setName(data.name);
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
        postData()

       handleAgregarProducto()
    }, [user,productoNuevo, loading, history]);

    // const cargarProducto = async () => {
    //     const productoTemporal = await consultarDatabase()
    // }

    const [listaProductos, setListaProductos] = useState([])

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div class="container-fluid">
                <div class="row">
                    <NavBarLateral />
                    <div className="container-fluid col-10">
                        <div className="container justify-content d-flex">
                            <h1 className="text-light">Vender</h1>
                        </div>
                        <hr className="colHr border" />
                        <div className="container-fluid">
                            <h2 className="headertekst-ventas text-light">Buscar Ventas</h2>
                        </div>
                        <div className="container justify-content-end">
                            <form className="row g-12">
                                <div className="col-auto">
                                    <input type="text" className="form-control" placeholder="Buscar" />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-outline-danger mb-3">Buscar</button>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-6 container-fluid border">
                                    <div className="container-fluid text-white">
                                        <h2>Productos</h2>
                                    </div>
                                    {
                  productos.map((u) => (
                                    <div className="container mb-2">

                                        <div className="card mb-2 " >
                                            <img className="card-img-top"
                                                src= "https://img.favpng.com/11/13/14/architectural-engineering-building-computer-software-clip-art-png-favpng-kT0HSNKnv6kte1r5B1YEY1FAY.jpg"
                                                alt="imagen producto"
                                                width="100em" height="200em"
                                            />
                                            <div class="card-body justify-content">
                                                <h4 class="card-title">{u.nombre}</h4>
                                                <p class="card-text">{u.descripcion}</p>
                                                <p class="card-text">${u.precio}</p>
                                               
                                                <button class="btn btn-outline-success"
                                                 onClick={() => {setProductoNuevo(u)}}>Añadir</button>
                                            </div>
                                        </div>

                                    </div>
                  ))} 
                                </div>

                                <div className="col-6 container border">
                                    <div className="container-fluid ">
                                        <h4 className="text-light">Resumen de Venta</h4>
                                        <div className="d-flex gap-5 justify-content-center border">
                                            <table className="table text-white">
                                                <thead>
                                                    <th>Producto</th>
                                                    <th>Cantidad</th>
                                                </thead>
                                                
                                                <tbody>
                                                {
                                                           productossele.map((u) => (
                                                    <tr  key={u.id}>
                                                        <td>{u.nombre}</td>
                                                        <td>
                                                            <div className="co-auto">
                                                                <input type="number" className="reduceInput" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                           ))
                                                           }  
                                                </tbody>
                                                
                                            </table>
                                        </div>
                                    </div>
                                    <hr className="border" />
                                    <div className="headertekst ">
                                        <h4 className="text-light">Datos del Cliente</h4>
                                        <br />
                                        <div className="row mb-3">
                                            <label className="col-sm-2 col-form-label col-form-label-sm text-white">Nombre:</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-2 col-form-label col-form-label-sm text-white">Documento:</label>
                                            <div className="col-sm-8">
                                                <input type="number" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label className="col-sm-2 col-form-label col-form-label-sm text-white">Teléfono:</label>
                                            <div className="col-sm-8">
                                                <input type="number" className="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border" />
                                    <h4 className="headertekst text-light">Total</h4>
                                    <br />
                                    <div className="container-fluid col-6 input-group mb-3">

                                        <form className="row g-12">
                                            <div className="col-auto">
                                                <input type="text" className="form-control" placeholder="Total" />
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-outline-danger mb-3"
                                                  onClick={handlerGuardarVenta}>Guardar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Ventas;