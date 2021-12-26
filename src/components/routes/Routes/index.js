import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../../auth/Login";
import NotFound from "../../notFound/NotFound";
// import useAuth from "../../newComponent/hooks/useAuth";
// import PrivateRoute from "../../newComponent/routes/components/PrivateRoute";
// import GuestRoute from "../../newComponent/routes/components/GuestRoute";
// import {
//     CircularProgress,
//     // makeStyles,
//     Container,
//     Grid,
// } from "@material-ui/core";
import Apartments from "../../apartments/Apartments";
import Registration from "../../registration/Registration";
import User from "../../user/User";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         padding: theme.spacing(3),
//     },
// }));

function Routes() {
    // const classes = useStyles();
    // const auth = useAuth();

    return (
    // auth.isLoaded ? (

        <Switch>
            <Route exact path="/" >
                <Apartments />
            </Route>

    //         {/*<PrivateRoute path="/profile">*/}
    //         {/*    <Profile />*/}
    //         {/*</PrivateRoute>*/}

            <Route path="/login">
                 <Login />
            </Route>
          <Route path="/registration">
                 <Registration />
           </Route>
            <Route path="/user">
                <User/>
            </Route>
             <Route path="/not-found-404">
                <NotFound />
             </Route>
             <Redirect to="/not-found-404" />
        </Switch>
    // ) : (
    //     <Container maxWidth="md" >
    //         <Grid container spacing={3} alignItems="center" justify="center">
    //             <Grid item>
    //                 <CircularProgress color="inherit" />
    //             </Grid>
    //         </Grid>
    //     </Container>
    // )
    );
}

export default Routes;