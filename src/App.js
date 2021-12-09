import './App.css';
import Header from "./components/header/Header";
import SimpleBottomNavigation from "./components/menNav/MenNav";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Container} from "@mui/material";
import Apartments from "./components/apartments/Apartments";
import Registration from "./components/registration/Registration";
import User from "./components/user/User";
import Apartment from "./components/apartment/Apartment";

function App() {

  return (
      <BrowserRouter>
          <Header/>
          <div className={'app'}>
              <Container>
                  <Switch>
                      <Route path={'/'} component={Apartments} exact/>
                      <Route path={'/registration'} component={Registration}/>
                      <Route path={'/user'} component={User}/>
                      <Route path={'/apartment'} component={Apartment}/>
                      {/*<Route path={'/search'} component={Search}/>*/}
                  </Switch>
              </Container>
          </div>
          <SimpleBottomNavigation/>
      </BrowserRouter>
  );
}

export default App;
