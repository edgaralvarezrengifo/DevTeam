import React, { useEffect } from "react";
import NavBar from "../../NavBar";
import NavBarLateral from "../../NavBarLateral";
import "./PersonalData.css";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    HttpLink
} from "@apollo/client";
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:4000',
    })
  });


function PersonalData() {
    const [usuario, setUsuario] = React.useState({
        id: '',
        email: '',
        status: '',
        rol: '',
        name: ''
    });

    useEffect(() => {
        console.log("hola", localStorage.getItem('email'));

        setUsuario(
            {
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email')
            }
        )
    }, []);

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

    const updateUser = async (_id, name, email) => {
        try {
            await client.mutate({
                mutation: gql`
              mutation updateUser($_id:ID!, $name: String!, $email: String!) {
                updateUser(
                    _id: $_id
                    email:$email
                    name:$name
                  ){
                    email
                    name
                    _id
                  }
                }`,
                variables: { _id, email, name }
            })
                .then((response) => {
                    console.log("updateeee:", response.data)
                })
        } catch (err) {
            console.error(err);
            return err
        }
    }

   const ivan =() =>{
    let name =document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let id = localStorage.getItem('_id');
       updateUser(id, name, email);
   }

    return (
        <>
            <div><NavBar /></div>
            <NavBarLateral />
            <div className="container-fluid">

                <div className="col-md-6  container mt-12">
                    <label className="form-label text-light mt-4">Nombre</label>
                    <input className="form-control container text" id="name" type="text" defaultValue={usuario.name} />
                    <label className="form-label text-light mt-4">Correo</label>
                    <input className="form-control container text" id="email" type="text" defaultValue={usuario.email} />
                </div>
                <div className="mt-4 mb-3">
                    <a role="button" onClick={ivan} className="btn btn-dark btn-outline-danger" title="Guardar edicion"
                    >Actualizar
                    </a>
                </div>
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



export default PersonalData;