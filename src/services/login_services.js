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

const tokenRefresh = () => {
    fetch(url + '/refresh',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(localStorage.getItem('refresh'))
    })
        .then(data => data.json())
        .catch(err => alert(err))
}

export {tokenRefresh}