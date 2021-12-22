let url = 'http://localhost:8000/api/v1/comments_apartment';

const commentsApartmentServices = () => {
    return fetch(url)
        .then(value => value.json()
        ).catch(err => err.message);
};

export {commentsApartmentServices};