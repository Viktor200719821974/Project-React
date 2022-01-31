import React from 'react';
import UserRentBlock from "./UserRentBlock";

const UserRentBlockActive = ({date_selection}) => {

    return (
        <div>
            {date_selection.map(c => <UserRentBlock  key={c.id}
                                                     date_arrival={c.date_arrival}
                                                     date_departure={c.date_departure}
                                                     apartment_id={c.apartment}
                                                     cost={c.cost}
                                                     number_days={c.number_days}
                                                     number_peoples={c.number_peoples}
            />)}
        </div>
    );
};

export default UserRentBlockActive;