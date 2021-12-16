import React, { useEffect, useState, render } from "react";
import NavBar from "../../NavBar";
import NavBarLateral from "../../NavBarLateral";
import "./Users.css";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import editar from "../../editar.png"



function Users() {
    const [idBuscada, setIdBuscada] = useState('');
    const [idCambiada, setIdCambiada] = React.useState('');
    const [usuario, setUsuario] = React.useState({
        id: '',
        email: '',
        status: '',
        rol: ''
    });

    const handleEstado = (e) => {
        setIdCambiada(usuario.id)
    
        setUsuario(
          {
            id: usuario._id,
            email: usuario.email,
            status: e.target.value,
            rol: usuario.rol,
          }
        )
      }
      console.log(usuario._id);
      const handleRol = (e) => {
        setIdCambiada(usuario.id)
        setUsuario(
          {
            id: usuario.id,
            email: usuario.email,
            status: usuario.status.estado,
            rol: e.target.value,
          }
        )
      }

    /*client.query({
        query: gql `
        query{
            user{_id}
        }
        `
    })
    .then(result => console.log(result))*/

    const dataGraphql = gql`
    query{
        user{_id, name, email, status{estado}, rol{estado,rol}}
    }
    `;

    const { loading, error, data } = useQuery(dataGraphql);

    if (loading) {
        return <p>loading..</p>
    }
    if (error) {
        return <p>Error..</p>
    }
    const handleBuscador = (e) => {
        setIdBuscada(e.target.value)
    }

    const handleBotonBuscador = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div><NavBar /></div>
            <div className="row">
                <NavBarLateral />
                <div className="col-md-6 col-sm-10">
                    <div ClassName="">
                        <form ClassName="" onSubmit={handleBotonBuscador}>
                            <br />
                            <br />
                            <h4 className="headertekst text-light">Buscar Usuario</h4>
                            <div className="buscar-group input-group mb-6 " >
                                <input className="" type="text" placeholder="Busqueda por ID" onChange={handleBuscador} value={idBuscada} />
                                <button className="btn btn-dark btn-outline-secondary ml-3">Buscar</button>
                            </div>
                        </form>
                    </div>
                    <div ClassName="container mt-4">
                        <table className="table table-sm table-striped table-dark align-middle">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.user.map((u) => (
                                        <tr key={u._id}>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>{u.status.estado}</td>
                                            <td>{u.rol.rol}</td>
                                            <td>
                                                <button type="submit" className="btn" data-toggle="modal" data-target="#editarModal" onClick={() => { setUsuario(u) }}
                                                >
                                                    <img className="iconoEditarUsuario" src={editar} alt="editar" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-3 col-sm-12 bg-dark container mt-2">
                    <label className="text-light d-flex mt-4 mb-2">Identificacion</label>
                    <input className="form-control container" id="disabledInput" type="text" placeholder={usuario.id} disabled />
                    <label className="text-light d-flex mt-4 mb-2">Correo</label>
                    <input className="form-control container" id="disabledInput" type="text" placeholder={usuario.email} disabled />
                    <form>
                        <div className="row">
                            <label className="form-label text-light col-4 mt-4">Estado: </label>
                            <select className="custom-select mt-4 col-7" onChange={handleEstado}>
                                <option selected hidden>{usuario.status.estado}</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Autorizado">Autorizado</option>
                                <option value="No autorizado">No autorizado</option>
                            </select>
                        </div>
                        <hr className="mb-2" />
                        <div className="row">
                            <label className="form-label text-light col-4">Rol:</label>
                            <select className="custom-select col-7" onChange={handleRol}>
                                <option selected hidden>{usuario.rol.rol}</option>
                                <option value="Vendedor">Vendedor</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        <div className="mt-4 mb-3">
                            <a role="button" type="submit" className="btn btn-dark btn-outline-danger" title="Guardar edicion"
                            >Guardar
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal fade" id="guardarEdicion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cambios realizados con éxito</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="close btn-dark" data-dismiss="modal"
                                aria-label="Close">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Users;