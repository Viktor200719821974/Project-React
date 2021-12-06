const url = 'http://localhost:8000/api/v1/auth';
async function loginUser(credentials) {
    return fetch(url, {
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