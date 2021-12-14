import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Ventas.css";
import { auth, db, logout } from "./firebase";
import logo from "./usuario.png"
function NavBar() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading){
      return;
    } 
    if (!user) return history.replace("/");
    fetchUserName();
  }, [user, loading,history]);
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">FSOCIETY</a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
     
        <div className="navbar-nav">
           
            <div className="nav-item text-nowrap">
            <img  src={logo} alt="" width="25em" height="25em"/>
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">{name}</a>
                <button className="btn btn-light" onClick={logout}>
            Logout
            </button>
            
            </div>
        </div>
    </header>
    
  );
}
export default NavBar;