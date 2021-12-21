const url = 'http://localhost:8000/api/v1/apartments';
const accessToken = localStorage.getItem('access');

async function deleteApartment(id) {
    return fetch(url + `/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify()
    }).catch(err => err.message)
}
export {deleteApartment};