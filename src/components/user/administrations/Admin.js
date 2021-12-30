import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import useAuth from "../../../hook/useAuth";
import api from "../../../services/api";
import AdminContent from "./adminModal/AdminContent";
import CustomPagination from "../../pagination/CustomPagination";

const Admin = () => {
    const auth = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [loaded, setLoaded] = useState(false);
    console.log(page);

    const handleUsers = async(e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await api.auth.getUsers();
            setUsers(res.data.data);
            setNumOfPages(res.data.total_pages);
            if (res){
                setLoaded(true);
            }
        }catch (e) {
            console.log(e.message)
        }
        setIsLoading(false);
    }
    useEffect(async () => {
        if (loaded){
            const res = await api.auth.getUsers(page);
        }
    },[page])
    if (isLoading){
        return <div>Loading...</div>
    }
    return (
        <>
        <div>
            <Button onClick={handleUsers} variant="outlined" color="success" startIcon={<PersonIcon /> }
                    sx={{fontWeight:800, float: 'right', margin: '10px 0 0 10px'}}>Get Users </Button>
        </div>
            <div className={'trending'}>

                {users && users.map((c, index) => <AdminContent
                    key={index}
                    id={c.id}
                    email={c.email}
                    created_at={c.created_at}
                    updated_at={c.updated_at}
                    is_active={c.is_active}
                    is_staff={c.is_staff}
                    is_superuser={c.is_superuser}
                    />
               )}
            </div>
            {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages}/>}
        </>
    );
};

export default Admin;