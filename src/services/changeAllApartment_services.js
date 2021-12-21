const url = 'http://localhost:8000/api/v1/apartments';
const accessToken = localStorage.getItem('access');

async function changeAllApartment({country, city, region, numbers_squares, numbers_people, numbers_rooms, price, id}) {
    return fetch(url + `/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(country, city, region, numbers_squares, numbers_people, numbers_rooms, price)
    })
        .then(data => data.json())
        .catch(err => err.message)
}

async function changeApartment({country, city, region, numbers_squares, numbers_people, numbers_rooms, price, id}) {
    return fetch(url + `/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(country, city, region, numbers_squares, numbers_people, numbers_rooms, price)
    })
        .then(data => data.json())
        .catch(err => err.message)
}

export {changeAllApartment, changeApartment};