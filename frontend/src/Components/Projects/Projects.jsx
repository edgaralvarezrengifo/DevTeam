import React, { useEffect, useState, render } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "../../NavBar";
import NavBarLateral from "../../NavBarLateral";
import Swal from 'sweetalert2';
import "./projects.css";
import { addProJectGraphQl, auth, db, logout, UpdateProJectGraphQl } from "../../firebase";
import withReactContent from 'sweetalert2-react-content'
import { Link, useHistory } from "react-router-dom";

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
    const MySwal = withReactContent(Swal);
    const [user] = useAuthState(auth);
    const [idBuscada, setIdBuscada] = useState('');
    const [actualiza,setActualzar]=useState(false);
    const [crear,setCrear]=useState(false);
    const [idCambiada, setIdCambiada] = React.useState('');
    const [idusr, set_idusr] = useState("");
    const [name, setName] = useState("");
    const [rol, setRol] = useState("");
    const history = useHistory();
    const [proyectos, setproyectos] = React.useState({
        id: '',
        nombre_proyecto: '',
        estado: '',
        fase: '',
        encargado: ''
    });
    const [proyectosNuevo, setproyectosNuevo] = React.useState({
        id: '',
        nombre_proyecto: '',
        estado: '',
        fase: '',
        encargado: ''
    });


    const fetchUserName = async () => {
    try {    
      setName(localStorage.getItem('name'));
      setRol(localStorage.getItem('rol'));
      set_idusr(localStorage.getItem('_id'));
      console.log(localStorage.getItem('name'));
      console.log("rol:"+rol)
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
  
    if (!user) return history.replace("/");
    fetchUserName();
  }, [user,proyectos,rol,name, history]);

    

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

    const {loading,  error, data } = useQuery(dataGraphql);

    

    if (loading) {
        return <p>loading..</p>
    }
    if (error) {
        return <p>Error..</p>
    }

    const handleCrearNombre = (e) => {
        setproyectosNuevo({
            _id: proyectos._id,
            nombre_proyecto: e.target.value,
            objetivos_generales:e.target.value,
            objetivos_especificos:proyectosNuevo.objetivos_especificos,
            presupuesto:proyectosNuevo.presupuesto,
            encargado:idusr,
            observaciones:"creación del proyecto"
           
        })
    }

    const handleCrearobjetivos_generales = (e) => {
        setproyectosNuevo({
            _id:proyectos._id,    
            nombre_proyecto:proyectosNuevo.nombre_proyecto,
            objetivos_generales:e.target.value,
            objetivos_especificos:proyectosNuevo.objetivos_especificos,
            presupuesto:proyectosNuevo.presupuesto,
            encargado:idusr,
            observaciones:"creación del proyecto"
        })
    }

    const handleCrearobjetivos_esp = (e) => {
        setproyectosNuevo({
            _id:proyectos._id,    
            nombre_proyecto:proyectosNuevo.nombre_proyecto,
            objetivos_generales:proyectosNuevo.objetivos_generales,
            objetivos_especificos:e.target.value,
            presupuesto:proyectosNuevo.presupuesto,
            encargado:idusr,
            observaciones:"creación del proyecto"
        })
    }
    const handleCrearpresupuesto = (e) => {
        setproyectosNuevo({
            _id:proyectos._id,    
            nombre_proyecto:proyectosNuevo.nombre_proyecto,
            objetivos_generales:proyectosNuevo.objetivos_generales,
            objetivos_especificos:proyectosNuevo.objetivos_especificos,
            presupuesto:e.target.value,
            encargado:idusr,
            observaciones:"creación del proyecto"
        })
    }

 

    const handleCrearProyecto = async () => {
        console.log(proyectosNuevo)

        if(crear)
            addProJectGraphQl(proyectosNuevo.nombre_proyecto, proyectosNuevo.objetivos_generales, proyectosNuevo.objetivos_especificos,proyectosNuevo.presupuesto,proyectosNuevo.encargado)
    
        else if(actualiza){
            console.log("entra a actualizar!!!");
            UpdateProJectGraphQl(proyectosNuevo._id,proyectosNuevo.nombre_proyecto, proyectosNuevo.objetivos_generales, proyectosNuevo.objetivos_especificos)
        }
        else if(!crear && !actualiza){

        }
        await MySwal.fire({
            title: <strong>Exito!</strong>,
            html: <i>Se guardó el cambio correctamente!</i>,
            icon: 'success'
          })

        setproyectosNuevo({
            _id:"",    
            nombre_proyecto:"",
            objetivos_generales:"",
            objetivos_especificos:"",
            presupuesto:0,
            encargado:idusr,
            observaciones:"creación del proyecto"
        })
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
                                { rol==="61984d2558a50c9b2a89aead" &&
                                    <a role="button" type="submit" className="btn btn-dark btn-outline-warning" title="crear proyecto" onClick={() => { setCrear(true);setActualzar(false); }}
                                    >Nuevo Proyecto</a>
                                    
                                }
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
                                   {rol==="61984d2558a50c9b2a89aead" && <th scope="col">Actualizar</th>}
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
                                                <button type="submit" className="btn" data-toggle="modal" data-target="#editarModal" onClick={() => { setproyectos(u); setActualzar(false);setCrear(false)}}
                                                >
                                                    <img className="iconoEditarUsuario" src={editar} alt="editar" />
                                                </button>
                                            </td>
                                           { rol=== "61984d2558a50c9b2a89aead" && <td>
                                                <button type="submit" className="btn" data-toggle="modal" data-target="#editarModal" onClick={() => { setproyectos(u);setActualzar(true) }}
                                                >
                                                    <img className="iconoEditarUsuario" src={actualizar} alt="actualizar" />
                                                </button>
                                            </td>}
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
                    <input className="form-control container" id="disabledInput" type="text" onChange={handleCrearNombre} placeholder={proyectos.nombre_proyecto}  />
                   
                    {(actualiza || crear) && 
                    <div>
                        <label className="text-light d-flex mt-4 mb-2" >Objetivos Generales</label>
                        <input className="form-control container" id="objgen" type="text" onChange={handleCrearobjetivos_generales}   />
                        <label className="text-light d-flex mt-4 mb-2" >Objetivos especificos</label>
                        <input className="form-control container" id="objesp" type="text" onChange={handleCrearobjetivos_esp}   />
                        <label className="text-light d-flex mt-4 mb-2" onChange={handleCrearpresupuesto} >Presupuesto</label>
                        <input className="form-control container" id="presup" type="number"   />
                    </div>
                         
                    }
                    {
                    actualiza&&
                    <div>
                         <label className="text-light d-flex mt-4 mb-2" visible>Avances</label>
                         <input className="form-control container" id="avances" type="text"  visible />
                     </div>
                    }

                   {/*  
                    <br ></br>
                    <a role="button" type="submit" className="btn btn-dark btn-outline-danger" title="Guardar edicion"
                            >Guardar
                            </a>  */}
                    <form>
                        { !actualiza &&
                        <div>
                            <div className="row">
                                <label className="form-label text-light col-4 mt-4">Estado: </label>
                                <select className="custom-select mt-4 col-7" onChange={handleEstado}>
                                    <option selected hidden>{proyectos.estado.estado}</option>
                                    <option value="6170dc6c7a7f63bad3d096f1">Activo</option>
                                    <option value="6170dc6c7a7f63bad3d096f2">Inactivo</option>
                                </select>
                            </div>
                            <div>
                                <hr className="mb-2" />
                            </div>
                            <div className="row">
                                <label className="form-label text-light col-4">Fase:</label>
                                <select className="custom-select col-7" onChange={handleFase}>
                                    <option selected hidden>{proyectos.fase.fase}</option>
                                    <option value="61a9488d7910ddc694343da6">En desarrollo</option>
                                    <option value="61a948ad7910ddc694343dab">Finalizado</option>
                                
                                </select>
                            </div>
                        </div>
                        }
                        <div className="mt-4 mb-3">
                            <a role="button" type="submit" className="btn btn-dark btn-outline-danger" title="Guardar edicion"  onClick={handleCrearProyecto} 
                            >Guardar
                            </a>
                        </div>
                    </form>
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
<br />
<br />
<br />
<br />
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