import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import api from "../../../services/api";
import AdminBlockedContent from "./adminBlockedModal/AdminBlockedContent";
import CustomPagination from "../../pagination/CustomPagination";
import ForumIcon from '@mui/icons-material/Forum';
import CommentIcon from '@mui/icons-material/Comment';
import AdminCommentsApartmentsContent from "./adminCommentsApartments/AdminCommentsApartmentsContent";
import CloseIcon from '@mui/icons-material/Close';
import AdminCommentsUserContent from "./adminCommentsUser/AdminCommentsUserContent";
import useAuth from "../../../hook/useAuth";

const Admin = () => {

    const [users, setUsers] = useState([]);
    const [commentsApartments, setCommentsApartments] = useState([]);
    const [commentsUsers, setCommentsUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [loaded, setLoaded] = useState(false);
    const [loadedCommentsUsers, setLoadedCommentsUsers] = useState(false);
    const [loadedCommentsApartments, setLoadedCommentsApartments] = useState(false);
    const [statusResponse, setStatusResponse] = useState(false);
    const auth = useAuth();

    const handleUsers = async(e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await api.auth.getUsers(page);
            setUsers(res.data.data);
            setNumOfPages(res.data.total_pages);
            if (res){
                setLoaded(true);
            }
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message)
        }
        setIsLoading(false);
    }
    useEffect(() => {
        async function fetchData (){
            try{
                if (loaded){
                    const res = await api.auth.getUsers(page);
                    setUsers(res.data.data)
                }
            }catch (e) {
                if (e.response.status === 401){
                    auth.setRefreshToken(true);
                }
                console.log(e.message);
            }
        }
        fetchData();
    },[page, statusResponse, loaded])

    const handleCommentsApartment = async(e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await api.auth.getCommentsApartments(page);
            setCommentsApartments(res.data.data);
            setNumOfPages(res.data.total_pages);
            if (res){
                setLoadedCommentsApartments(true);
            }
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message)
        }
        setIsLoading(false);
    }
    useEffect( () => {
        async function fetchData (){
            try{
                if (loadedCommentsApartments){
                    const res = await api.auth.getCommentsApartments(page);
                    setCommentsApartments(res.data.data)
                }
            }catch (e) {
                if (e.response.status === 401){
                    auth.setRefreshToken(true);
                }
                console.log(e.message);
            }
        }
        fetchData();
    },[page, statusResponse, loadedCommentsApartments])

    const handleCommentsUsers = async(e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await api.auth.getCommentsUsers(page);
            setCommentsUsers(res.data.data);
            setNumOfPages(res.data.total_pages);
            if (res){
                setLoadedCommentsUsers(true);
            }
        }catch (e) {
            if (e.response.status === 401){
                auth.setRefreshToken(true);
            }
            console.log(e.message)
        }
        setIsLoading(false);
    }
    useEffect( () => {
        async function fetchData(){
            try{
                if (loadedCommentsUsers){
                    const res = await api.auth.getCommentsUsers(page);
                    setCommentsUsers(res.data.data)
                }
            }catch (e) {
                if (e.response.status === 401){
                    auth.setRefreshToken(true);
                }
                console.log(e.message);
            }

        }
        fetchData();
    },[page, statusResponse, loadedCommentsUsers])

    const handleClosed = () => {
        setLoaded(false);
        setLoadedCommentsApartments(false);
        setLoadedCommentsUsers(false);
        setPage(1);
        setUsers([]);
        setCommentsUsers([]);
        setCommentsApartments([]);
    }
    if (isLoading){
        return <div>Loading...</div>
    }
    return (
        <>
        <div className={'admin_button'}>
            <div>
            <Button onClick={handleUsers} variant="outlined" color="success" startIcon={<PersonIcon /> }
                    sx={{fontWeight:800, float: 'right', margin: '10px 0 0 10px'}}>Get Users </Button>
            </div>
            <div>
                <Button onClick={handleCommentsApartment} variant="outlined" color="success" startIcon={<ForumIcon /> }
                        sx={{fontWeight:800, float: 'right', margin: '10px 0 0 10px'}}>Get comments apartment </Button>
            </div>
            <div>
                <Button onClick={handleCommentsUsers} variant="outlined" color="success" startIcon={<CommentIcon /> }
                        sx={{fontWeight:800, float: 'right', margin: '10px 0 0 10px'}}>Get comments Users </Button>
            </div>
            <div>
                <Button onClick={handleClosed} variant="outlined" color="error" startIcon={<CloseIcon /> }
                        sx={{fontWeight:800, float: 'right', margin: '10px 0 0 10px'}}>Close </Button>
            </div>
        </div>
            <div className={'trending'}>

                {users && users.map((c, index) => <AdminBlockedContent
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
                {commentsApartments && commentsApartments.map((c, index) => <AdminCommentsApartmentsContent
                    key={index}
                    id={c.id}
                    apartment={c.apartment}
                    comments={c.comments}
                    name_user={c.name_user}
                    photo_comments={c.photo_comments}
                    rating={c.rating}
                    statusResponse={statusResponse}
                    setStatusResponse={setStatusResponse}
                    />
                )}
                {commentsUsers && commentsUsers.map((c, index) => <AdminCommentsUserContent
                        key={index}
                        id={c.id}
                        user={c.user}
                        comments={c.comments}
                        name_user={c.user_name}
                        photo_comments={c.photo_comments_user}
                        rating={c.rating}
                        statusResponse={statusResponse}
                        setStatusResponse={setStatusResponse}
                    />
                )}
            </div>
            {(loadedCommentsApartments || loadedCommentsUsers || loaded) && (numOfPages > 1 &&  <CustomPagination
                setPage={setPage} numOfPages={numOfPages}/>)}
        </>
    );
};

export default Admin;