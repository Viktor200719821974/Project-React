async function loginUser(credentials) {
    return fetch('http://localhost:8000/api/v1/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(err => alert(err))
}
export {loginUser}

const tokenAccess = () =>{
    fetch('http://localhost:8000/api/v1/auth', {
        method: "Get",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer" + localStorage.getItem("access")

        }
    })
}
export {tokenAccess}

const tokenRefresh = () => {
    fetch('http://localhost:8000/api/v1/auth/refresh',{
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