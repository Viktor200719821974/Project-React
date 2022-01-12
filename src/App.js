import './App.css';
import Header from "./components/header/Header";
// import SimpleBottomNavigation from "./components/menNav/MenNav";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Container} from "@mui/material";
import Apartments from "./components/apartments/Apartments";
import Registration from "./components/registration/Registration";
import User from "./components/user/User";
import Auth from "./components/auth/Auth";
import Admin from "./components/user/administrations/Admin";
import SuperAdmin from "./components/user/administrations/SuperAdmin";

function App() {

  return (
      <BrowserRouter>
          <Header/>
          <div className={'app'}>
              <Container>
                  <Switch>
                      <Route path={'/'} component={Apartments} exact/>
                      <Route path={'/login'} component={Auth}/>
                      <Route path={'/registration'} component={Registration}/>
                      <Route path={'/user'} component={User}/>
                      <Route path={'/admin'} component={Admin}/>
                      <Route path={'/superAdmin'} component={SuperAdmin}/>
                  </Switch>
              </Container>
          </div>
          {/*<SimpleBottomNavigation/>*/}
      </BrowserRouter>
  );
}

export default App;
