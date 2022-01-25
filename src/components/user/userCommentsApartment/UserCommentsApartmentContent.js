import React from 'react';
import '../User.css';
import UserCommentsApartmentsModal from "./UserCommentsApartmentModal";

function UserCommentsApartmentContent({id, email, name, comments, dateSelection, setStatusResponse, surname, lengthArray}) {
    return (
        <>

            {!lengthArray ?
                (dateSelection && dateSelection.map((c, index) => <UserCommentsApartmentsModal
                    key={index}
                    id={id}
                    comments={comments}
                    email={c.user_email}
                    dateSelection={dateSelection}
                    setStatusResponse={setStatusResponse}
                    lengthArray={lengthArray}
                    >
                <div>
               <span>{c.name_user} {c.surname_user}</span>
                </div>
            </UserCommentsApartmentsModal>
            ))
                :
                (
                    <UserCommentsApartmentsModal
                        id={id}
                        comments={comments}
                        email={email}
                        dateSelection={dateSelection}
                        setStatusResponse={setStatusResponse}
                        lengthArray={lengthArray}>

                        <div>
                            <span>{name} {surname}</span>
                        </div>
                    </UserCommentsApartmentsModal>
                )

            }

</>
    );
}

export default UserCommentsApartmentContent;