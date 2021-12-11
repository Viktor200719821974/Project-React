const url = 'http://localhost:8000/api/v1/users';

function getUser(userId) {

    return fetch(url + `/${userId}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
    }).then(value => value.json())
        .catch(err => err.message)
            // .catch(function (error){
            //     if (error.response){
            //         alert(error.response.data);
            //         alert(error.response.status);
            //         alert(error.response.headers);
            //     } else if (error.request){
            //         alert(error.request);
            //     } else {
            //         alert('The server does not respond ', error.message);
            //     }
            //     alert(error.config);
            // })
    }

export {getUser}