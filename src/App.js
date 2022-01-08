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
// import UserCommentsApartment from "./components/user/userCommentsApartment/UserCommentsApartment";

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
                      {/*<Route path={'/comments_apartment'} component={UserCommentsApartment}/>*/}
                  </Switch>
              {/*    <Routes/>*/}
              </Container>
          </div>
          {/*<SimpleBottomNavigation/>*/}
      </BrowserRouter>
  );
}

export default App;

// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     Button,
//     // makeStyles,
// } from "@material-ui/core";
// import { Link, useHistory } from "react-router-dom";
// import "./App.css";
// import Routes from "./components/newComponent/routes/Routes";
// import useAuth from "./components/newComponent/hooks/useAuth";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     rightToolbar: {
//         flexGrow: 1,
//     },
//     title: {
//         marginRight: theme.spacing(2),
//     },
// }));

// function App() {
//     // const classes = useStyles();
//     const auth = useAuth();
//     const history = useHistory();
//
//     const onLogOut = () => {
//         auth.logOut();
//         history.push("/login");
//     };
//
//     return (
//         <div >
//             <AppBar position="static">
//                 <Toolbar>
//                     <Typography variant="h6" >
//                         Real App
//                     </Typography>
//                     <div >
//                         <Button color="inherit" component={Link} to="/">
//                             Home
//                         </Button>
//                     </div>
//                     {auth.isLoaded &&
//                     (auth.user ? (
//                         <>
//                             <Button color="inherit" component={Link} to="/profile">
//                                 {auth.user.firstName} {auth.user.lastName}
//                             </Button>
//                             <Button color="inherit" onClick={onLogOut}>
//                                 Log out
//                             </Button>
//                         </>
//                     ) : (
//                         <>
//                             <Button color="inherit" component={Link} to="/login">
//                                 Login
//                             </Button>
//                             <Button color="inherit" component={Link} to="/registration">
//                                 Registration
//                             </Button>
//                         </>
//                     ))}
//                 </Toolbar>
//             </AppBar>
//
//             <Routes />
//         </div>
//     );
// }
//
// export default App;
