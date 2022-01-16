import React, {useEffect, useState} from 'react';
import api from "../../../services/api";
import UserManagerContent from "./userManager/UserManagerContent";
import CustomPagination from "../../pagination/CustomPagination";
import useAuth from "../../../hook/useAuth";

const SuperAdmin = () => {
    const [users, setUsers] = useState([]);
    const [statusResponse, setStatusResponse] = useState(false);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        async function fetchData(){
        setIsLoading(true);
        try{
            const res = await api.auth.getUsers(page);
            setUsers(res.data.data);
            setNumOfPages(res.data.total_pages)
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message);
        }
        }
        fetchData();
        setIsLoading(false);
    },[page, statusResponse, auth])
    if (isLoading){
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className={'trending'}>

                {users && users.map((c, index) => <UserManagerContent
                        key={index}
                        id={c.id}
                        email={c.email}
                        created_at={c.created_at}
                        updated_at={c.updated_at}
                        is_active={c.is_active}
                        is_staff={c.is_staff}
                        is_superuser={c.is_superuser}
                        statusResponse={statusResponse}
                        setStatusResponse={setStatusResponse}
                    />
                )}
            </div>
            {numOfPages > 1 &&  <CustomPagination setPage={setPage} numOfPages={numOfPages}/>}
        </div>
    );
};

export default SuperAdmin;