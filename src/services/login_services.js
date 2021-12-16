const url = 'http://localhost:8000/api/v1/auth';
async function loginUser(credentials) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),

    })
        .then(data => data.json())
        .catch((error) => console.log(error.response.status))
        // .catch(err => {
        //     if (err.response.status === 401){
        //         try{
        //             tokenRefresh()
        //         }catch (e) {
        //            console.log(e.message)
        //         }
        //     }
        // })
}
export {loginUser}
const refreshToken = localStorage.getItem('refresh');
console.log(refreshToken)
const tokenRefresh = () => {
    fetch(url + '/refresh',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'refresh':refreshToken})
    })
        .then(data => data.json())
        .catch(err => console.log(err.message))
}

export {tokenRefresh}