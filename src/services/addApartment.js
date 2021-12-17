const url = 'http://localhost:8000/api/v1/apartments';
const accessToken = localStorage.getItem('access');

async function addApartment(credential) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(credential)
    })
        .then(data => data.json())
        .catch(err => err.message)
}
export {addApartment};