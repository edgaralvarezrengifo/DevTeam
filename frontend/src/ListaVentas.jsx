import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import "./Ventas.css";
import { auth, db, logout } from "./firebase";
import NavBar from "./NavBar";
import NavBarLateral from "./NavBarLateral";
import { consultarDatabase, actualizarDocumentoDatabase } from "./firebase";
function Ventas() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [productos, setProdutos] = useState([]);

    async function postData() {

        setProdutos(await consultarDatabase('products'));

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
    }, [user, loading, history]);


    return (
        <>
            <div>
                <NavBar />
            </div>
            {/* <!-- Main --> */}
            <div class="container-fluid flex">
                <div class="row">
                    <NavBarLateral />
                    <div className="container-fluid col-10 flex">
                        <div className="container justify-content d-flex">
                            <h1 className="text-light">Lista de Ventas</h1>
                        </div>
                        <hr className="border" />
                        <div className="container-fluid">
                            <h2 className="headertekst-ventas text-light">Buscar</h2>
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
                                <div className="table-responsive">
                                    <table class="table table-bordered table-sm border text-white">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Productos</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Cliente</th>
                                                <th scope="col">Vendedor</th>
                                                <th scope="col">Accion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>000001</td>
                                                <td>Apartamento</td>
                                                <td>1</td>
                                                <td>120000000</td>
                                                <td>Jair Villegas</td>
                                                <td>Sofia Rico</td>
                                                <td><button class="btn btn-primary fas fa-edit"></button>
                                                    <button class="btn btn-primary fas fa-trash"></button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <div class="datatable-info col-6">
                                        Pagina
                                        <strong>1</strong>
                                        de
                                        <strong>1</strong>
                                    </div>
                                    <div class="container-fluid">
                                        <ul class="pagination pagination-sm justify-content-end">
                                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid text-white fixed-width">
                        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                            <div class="col-md-4 d-flex align-items-center">
                                <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                                </a>
                                <span class="text-muted justify-content-center">FSOCIETY&copy; 2021 Programadores</span>
                            </div>

                            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                                <li class="ms-3"><a class="text-muted" href="#"></a></li>
                                <li class="ms-3"><a class="text-muted" href="#"></a></li>
                                <li class="ms-3"><a class="text-muted" href="#"></a></li>
                            </ul>
                        </footer>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Ventas;