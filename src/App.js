import './App.css';
import React from 'react';
import Header from "./components/header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "@mui/material";
import Apartments from "./components/apartments/Apartments";
import Registration from "./components/registration/Registration";
import User from "./components/user/User";
import Auth from "./components/auth/Auth";
import Admin from "./components/user/administrations/Admin";
import SuperAdmin from "./components/user/administrations/SuperAdmin";
import PrivateRoute from "./routes/components/PrivateRoute";
import NotFound from "./components/notFound/NotFound";

function App() {

  return (
      <>
      <BrowserRouter>
          <Header/>
          <div className={'app'}>
              <Container>
                  <Routes>
                      <Route restricted={false} element={<Apartments/>} path="/" exact />
                      <Route restricted={true} element={<Auth/>} path="/login" exact />
                      <Route restricted={false} path={'/registration'} element={<Registration/>} exact/>

                      <Route element={<PrivateRoute><User/></PrivateRoute>} path="/user" exact />
                      <Route path={'/admin'} element={<PrivateRoute><Admin/></PrivateRoute>} exact/>
                      <Route path={'/superAdmin'} element={<PrivateRoute><SuperAdmin/></PrivateRoute>} exact/>

                      <Route path={'*'} element={<NotFound />}/>
                  </Routes>
              </Container>
          </div>
      </BrowserRouter>
      </>
  );
}

export default App;
