import {createStore} from "redux";
import {rootReducer} from "../components/redux/reducers/rootReducer";

export let store =createStore(rootReducer);
console.log(store);