import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import "./Ventas.css";
import { auth, db, logout } from "./firebase";
import usuario from "./usuarios.png"
import venta from "./venta.png"
import producto from "./producto.png"
function NavBarLateral() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [rol,setRol] = useState("");
  const history = useHistory();
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
      setRol(data.rol)
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
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="../ventas">
              <div className="boton_seccion">
                <img src={venta} alt="" width="25em" height="25em" />
                <Link to="/ventas">Ventas</Link>
                
              </div>
            </a>
            {
               rol==="Administrador" &&
             <Link to="/listaventas">Lista Ventas</Link>
            }
          </li>
          {
            rol==="Administrador" &&
                <li className="nav-item">
            <a className="nav-link active" aria-current="page" href='../' > 
            <div className="boton_seccion">
              <img src={producto} alt="" width="25em" height="25em" />
              <Link to="/productos">Productos</Link>
            </div>
            </a>
          </li>
            
        
          }
          {
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href='../gestionusuarios'>
            <div className="boton_seccion">
              <img className="imgDataPersonal" src={usuario} alt="" width="25em" height="25em" />
              <Link to="/PersonalData">Datos personales </Link>
            </div>  
            </a>
            
          </li>
        }
          {
          rol==="Administrador" &&
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href='../gestionusuarios'>
            <div className="boton_seccion">
              <img src={usuario} alt="" width="25em" height="25em" />
              <Link to="/Users">Gestion de usuarios</Link>
            </div>  
            </a>
            
          </li>
        }
        
        </ul>


      </div>



    </nav>

  );
}
export default NavBarLateral;