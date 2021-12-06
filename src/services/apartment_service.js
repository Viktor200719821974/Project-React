
const url = 'http://localhost:8000/api/v1/apartments';

function getApartments() {

    return fetch(url).then(value => value.json())
        .catch(err => alert(err))
}

export {getApartments}
