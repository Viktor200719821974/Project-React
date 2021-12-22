const url = 'http://localhost:8000/api/v1';
const accessToken = localStorage.getItem('access');

async function sendCommentApartment({comments, id, rating}) {
    return fetch(url + `/apartments/${id}/comment_apartment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({comments:comments, rating:rating})
    })
        .then(data => data.json())
        .catch(err => err.message)
}
export {sendCommentApartment}