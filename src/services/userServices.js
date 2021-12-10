export default class UserServices{
    static fetchUser(id){
        return  $api.get(`/users/${id}`)
    }
}