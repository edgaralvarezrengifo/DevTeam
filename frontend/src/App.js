
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Ventas from "./Ventas";
import ListaVentas from "./ListaVentas";
import GestionTabla from "./GestionTabla";
import Productos from "./Productos";
import Users from './Components/Users/Users';
import PersonalData from './Components/PersonalData/PersonalData';

function App() {
  return (
       <div className="App">
       <Router>
         <Switch>
           <Route exact path="/Users" component={Users} />
           <Route exact path="/PersonalData" component={PersonalData} />
           <Route exact path="/" component={Login} />
           <Route exact path="/register" component={Register} />
           <Route exact path="/reset" component={Reset} />
           <Route exact path="/ventas" component={Ventas} />
           <Route exact path="/listaventas" component={ListaVentas} />
           <Route exact path="/gestionusuarios" component={GestionTabla} />
           <Route exact path="/productos" component={Productos} />
         
         </Switch>
       </Router>

    </div>
  );
}

export default App;
