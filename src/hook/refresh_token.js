import api from "../services/api";

const refresh = async (e) => {

    const refreshToken = localStorage.getItem('refresh');
    let data = {['refresh']: refreshToken};
    try{
        const token = await api.auth.refresh(data);
        if (token.status === 200){
           return token.data;
        }
        // console.log(token);
    }catch (e) {
        console.log(e.message);
    }
}

const refreshToken = async () => {
      refresh().then(res => {
          console.log(res)
 });

}

export {refreshToken};

// function axiosTest() {
//     axios.get(url)
//         .then(response => response.data)
//         .catch(error => error);
// }
//
// async function getResponse () {
//     axiosTest().then(response => {
//         console.log(response)
//     });
// }
//
// getResponse()
