async function registrationUser(credentials) {
    return fetch('http://localhost:8000/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(err => alert(err))
}
export {registrationUser}
