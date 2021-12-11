async function registrationUser(credentials) {
    return fetch('http://localhost:8000/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(err => err.message);
        // .then(res => {
        //     // do good things
        // })
        // .catch(err => {
        //     if (err.response) {
        //         console.log('response');
        //     } else if (err.request) {
        //         console.log('request');
        //     } else {
        //         console.log(err.message);
        //     }
        // })
}
export {registrationUser}
