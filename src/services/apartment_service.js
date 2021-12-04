

function getApartments() {

    return fetch('http://localhost:8000/api/v1/apartments').then(value => value.json())
        .catch(err => alert(err))
}

export {getApartments}
