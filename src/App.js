import logo from './logo.svg';
import './App.css';
import Auth from "../src/pages/auth"
import Search from "../src/pages/search"
import Profile from "../src/pages/profile"
import Edit from "../src/pages/edit"
import FillSearch from "../src/pages/fillSearch"
import Add from "../src/pages/addLiteratures"
import Collections from "../src/pages/collections"
import Detail from "../src/pages/detailLiterature"
import Admin from "../src/pages/admin"
import {BrowserRouter,Route,Switch,Link} from "react-router-dom";
import PrivateRoute from "./privateRoute"
import AuthContext from "./cartContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Switch> 
          <Route exact path="/auth" component={Auth}/>
          <PrivateRoute exact path="/" component={Search}/>
          <PrivateRoute exact path="/search" component={FillSearch}/>
          <PrivateRoute exact path={`/detail/:id`} component={Detail}/>
          <PrivateRoute exact path={`/edit/:id`} component={Edit}/>
          <PrivateRoute exact path="/profile" component={Profile}/>
          <PrivateRoute exact path="/collections" component={Collections}/>
          <PrivateRoute exact path="/Add-Literature" component={Add}/>
          <PrivateRoute exact path="/admin" component={Admin}/>
        </Switch>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
