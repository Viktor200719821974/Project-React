const url = 'http://localhost:8000/api/v1/apartments';

function getApartments(page, countryValue, country, city, cityValue, region, regionValue, numbers_people,
                       numbersPeopleValue, numbers_rooms, numbersRoomsValue, numbers_squares, numbersSquaresValue,
                       price, priceValue) {
    // console.log(city, cityValue);
    const urlFilters = `&${country}=${countryValue}&${city}=${cityValue}&${region}=${regionValue}&${numbers_people}=
    ${numbersPeopleValue}&${numbers_rooms}=${numbersRoomsValue}&${numbers_squares}=${numbersSquaresValue}&${price}=
    ${priceValue}`;
    return fetch(url + `?page=${page}${urlFilters}`).then(value => value.json())
        .catch(e => e.message);
}


export {getApartments}
