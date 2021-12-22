
const url = 'http://localhost:8000/api/v1/apartments';

function getApartments() {

    return fetch(url).then(value => value.json())
        .catch(function (error){
            if (error.response){
               alert(error.response.data);
                alert(error.response.status);
                alert(error.response.headers);
            } else if (error.request){
                alert(error.request);
            } else {
                alert('The server does not respond ', error.message);
            }
            alert(error.config);
        })
}


export {getApartments}
