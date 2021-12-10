import $api from "../components/http";

export default class AuthServices{
    static async login(email, password){
        await $api.post('/auth', {email, password})
    }
    static async registration(email, password){
        await $api.post('/users', {email, password})
    }
    static async logout() {
        await $api.post('/logout')
    }
}