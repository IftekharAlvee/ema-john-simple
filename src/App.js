import React from 'react';
import './App.css';
import Header from './Components/header/Header';
import Shop from './Components/header/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext,useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <h3>Log in user: {loggedInUser.email}</h3>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/Product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
          
    </UserContext.Provider>
  );
}

export default App;
