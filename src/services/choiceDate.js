const url = 'http://localhost:8000/api/v1/apartments';
const accessToken = localStorage.getItem('access');

async function choiceDate({date_arrival, date_departure, number_peoples, id}) {
    return fetch(url + `/${id}/selected_date`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({date_arrival:date_arrival, date_departure:date_departure, number_peoples:number_peoples})
    })
        .then(data => data.json())
        .catch(err => err.message)
}

export {choiceDate};