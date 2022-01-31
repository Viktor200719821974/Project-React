import './App.css';
import Header from "./components/header/Header";
// import SimpleBottomNavigation from "./components/menNav/MenNav";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Container} from "@mui/material";
import Apartments from "./components/apartments/Apartments";
import Registration from "./components/registration/Registration";
import User from "./components/user/User";
import Auth from "./components/auth/Auth";
import Admin from "./components/user/administrations/Admin";
import SuperAdmin from "./components/user/administrations/SuperAdmin";
import GuestRoute from "./routes/components/GuestRoute";
import PrivateRoute from "./routes/components/PrivateRoute";
import NotFound from "./components/notFound/NotFound";

function App() {

  return (
      <>
      <BrowserRouter>
          <Header/>
          <div className={'app'}>

              <Container>
                  <Switch>
                      <GuestRoute restricted={false} component={Apartments} path="/" exact />
                      <GuestRoute restricted={true} component={Auth} path="/login" exact />
                      <GuestRoute restricted={false} path={'/registration'} component={Registration}/>
                      <PrivateRoute component={User} path="/user" exact />
                      <PrivateRoute path={'/admin'} component={Admin} exact/>
                      <PrivateRoute path={'/superAdmin'} component={SuperAdmin} exact/>
                      <Route path="*">
                          <NotFound />
                      </Route>
                  </Switch>
              </Container>
          </div>
          {/*<SimpleBottomNavigation/>*/}
      </BrowserRouter>
      </>
  );
}

export default App;
