import './App.css';
import Header from "./components/header/Header";
import SimpleBottomNavigation from "./components/menNav/MenNav";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Container} from "@mui/material";
import Trending from "./components/trending/Trending";

function App() {
  return (
      <BrowserRouter>
          <Header/>
          <div className={'app'}>
              <Container>
                  <Switch>
                      <Route path={'/'} component={Trending} exact/>
                      {/*<Route path={'/movies'} component={Movies}/>*/}
                      {/*<Route path={'/series'} component={Series}/>*/}
                      {/*<Route path={'/favorite'} component={Favorite}/>*/}
                      {/*<Route path={'/search'} component={Search}/>*/}
                  </Switch>
              </Container>
          </div>
          <SimpleBottomNavigation/>
      </BrowserRouter>
  );
}

export default App;
