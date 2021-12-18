import React, { useEffect, useState, render } from "react";
import NavBar from "../../NavBar";
import NavBarLateral from "../../NavBarLateral";
import "./projects.css";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";
import editar from "../../editar.png"
import actualizar from "../../actualizar.png"


function Projects() {
    const [idBuscada, setIdBuscada] = useState('');
    const [idCambiada, setIdCambiada] = React.useState('');
    const [proyectos, setproyectos] = React.useState({
        id: '',
        nombre_proyecto: '',
        estado: '',
        fase: '',
        encargado: ''
    });

    const handleEstado = (e) => {
        setIdCambiada(proyectos.id)
    
        setproyectos(
          {
            id: proyectos._id,
            nombre_proyecto: proyectos.nombre_proyectos,
            estado: e.target.value,
            fase: proyectos.fase,
            encargado:proyectos.encargado
          }
        )
      }
      console.log(proyectos._id);
      const handleFase = (e) => {
        setIdCambiada(proyectos.id)
        setproyectos(
          {
            id: proyectos._id,
            nombre_proyecto: proyectos.nombre_proyecto,
            estado: e.target.value,
            fase: e.target.value,
            encargado:proyectos.encargado
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
    query {
    proyectos{
        _id
        nombre_proyecto    
        estado{
            estado
        }
        fase{
            fase
        }
        encargado{
            name
        }
    }
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
                            <h4 className="headertekst text-light">Buscar Proyecto</h4>
                            <div className="buscar-group input-group mb-6 " >
                                <input className="" type="text" placeholder="Busqueda por ID" onChange={handleBuscador} value={idBuscada} />
                                <button className="btn btn-dark btn-outline-secondary ml-3">Buscar</button>
                                <a role="button" type="submit" className="btn btn-dark btn-outline-warning" title="crear proyecto"
                            >Nuevo Proyecto
                            </a>
                            </div>
                            
                        </form>
                    </div>
                    <div ClassName="container mt-4">
                        <table className="table table-sm table-striped table-dark align-middle">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Fase</th>
                                    <th scope="col">Encargado</th>
                                    <th scope="col">Editar</th>
                                    <th scope="col">Actualizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.proyectos.map((u) => (
                                        <tr key={u._id}>
                                            <td>{u.nombre_proyecto}</td>
                                            <td>{u.estado.estado}</td>
                                            <td>{u.fase.fase}</td>
                                            <td>{u.encargado.name}</td>
                                            <td>
                                                <button type="submit" className="btn" data-toggle="modal" data-target="#editarModal" onClick={() => { setproyectos(u) }}
                                                >
                                                    <img className="iconoEditarUsuario" src={editar} alt="editar" />
                                                </button>
                                            </td>
                                            <td>
                                                <button type="submit" className="btn" data-toggle="modal" data-target="#editarModal" onClick={() => { setproyectos(u) }}
                                                >
                                                    <img className="iconoEditarUsuario" src={actualizar} alt="actualizar" />
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
                    <label className="text-light d-flex mt-4 mb-2">Id proyecto</label>
                    <input className="form-control container" id="disabledInput" type="text" placeholder={proyectos._id} disabled />
                    <label className="text-light d-flex mt-4 mb-2">Nombre proyecto</label>
                    <input className="form-control container" id="disabledInput" type="text" placeholder={proyectos.nombre_proyecto}  />
                     <label className="text-light d-flex mt-4 mb-2" visible>Objetivos Generales</label>
                    <input className="form-control container" id="objgen" type="text" visible  />
                    <label className="text-light d-flex mt-4 mb-2" visible>Objetivos especificos</label>
                    <input className="form-control container" id="objesp" type="text"  visible />
                    <label className="text-light d-flex mt-4 mb-2" visible>Presupuesto</label>
                    <input className="form-control container" id="presup" type="number"  visible />
                   {/*  <label className="text-light d-flex mt-4 mb-2" visible>Avances</label>
                    <input className="form-control container" id="avances" type="text"  visible />
                    <br ></br>
                    <a role="button" type="submit" className="btn btn-dark btn-outline-danger" title="Guardar edicion"
                            >Guardar
                            </a>  */}
                    <form>
                        <div className="row">
                            <label className="form-label text-light col-4 mt-4">Estado: </label>
                            <select className="custom-select mt-4 col-7" onChange={handleEstado}>
                                <option selected hidden>{proyectos.estado.estado}</option>
                                <option value="6170dc6c7a7f63bad3d096f1">Activo</option>
                                <option value="6170dc6c7a7f63bad3d096f2">Inactivo</option>
                            </select>
                        </div>
                        <hr className="mb-2" />
                        <div className="row">
                            <label className="form-label text-light col-4">Fase:</label>
                            <select className="custom-select col-7" onChange={handleFase}>
                                <option selected hidden>{proyectos.fase.fase}</option>
                                <option value="61a9488d7910ddc694343da6">En desarrollo</option>
                                <option value="61a948ad7910ddc694343dab">Finalizado</option>
                              
                            </select>
                        </div>
                        <div className="mt-4 mb-3">
                            <a role="button" type="submit" className="btn btn-dark btn-outline-danger" title="Guardar edicion"
                            >Guardar Nuevo Proyecto
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



export default Projects;