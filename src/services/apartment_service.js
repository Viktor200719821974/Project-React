const url = 'http://localhost:8000/api/v1/apartments';

function getApartments(page, countryValue, country, city, cityValue, region, regionValue, numbers_people,
                       numbersPeopleValue, numbers_rooms, numbersRoomsValue, numbers_squares, numbersSquaresValue,
                       price, priceValue) {
    // console.log(price, priceValue);
    const urlFilters = `&${country}=${countryValue}&${city}=${cityValue}&${region}=${regionValue}&${numbers_people}=
    ${numbersPeopleValue}&${numbers_rooms}=${numbersRoomsValue}&${numbers_squares}=${numbersSquaresValue}&${price}=
    ${priceValue}`;
    return fetch(url + `?page=${page}${urlFilters}`).then(value => value.json())
        .catch(e => e.message)
            // function (error) {
        //     if (error.response){
        //        alert(error.response.data);
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


export {getApartments}
