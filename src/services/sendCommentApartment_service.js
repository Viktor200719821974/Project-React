const url = 'http://localhost:8000/api/v1';

async function sendCommentApartment({comments, id, rating}) {
    return fetch(url + `/apartments/${id}/comment_apartment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(comments, rating)
    })
        .then(data => data.json())
        .catch(err => alert(err))
}
export {sendCommentApartment}