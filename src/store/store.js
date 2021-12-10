import {makeAutoObservable} from 'mobx';
import {bool} from "prop-types";
import AuthServices from "../services/authServices";
import axios from "axios";
import {API_URL} from "../components/http";
export default class Store{
    // user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }
    setAuth(){
        this.isAuth = bool;
    }
    // setUser(){
    //     this.user = user;
    // }
    async login(email, password){
        try {
            const response = await AuthServices.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            // this.setUser(response.data.user);
        }
        catch (e){
                console.log(e.response?.data?.message);
        }
    }
    async registration(email, password){
        try {
            const response = await AuthServices.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            // this.setUser(response.data.user);
        }
        catch (e){
            console.log(e.response?.data?.message);
        }
    }
    async logout(){
        try {
            const response = await AuthServices.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            // this.setUser({});
        }
        catch (e){
            console.log(e.response?.data?.message);
        }
    }
    async checkAuth(){
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }
}
