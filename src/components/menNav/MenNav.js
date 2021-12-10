import React, {useEffect} from 'react';
import './MenNav.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import {useHistory} from "react-router";
import SearchIcon from '@mui/icons-material/Search';

export default function SimpleBottomNavigation() {

    const [value, setValue] = React.useState(0);
    const history = useHistory();

    useEffect(()=>{
        if(value === 0){
            history.push("/");
        }else if(value === 1){
            history.push("/user");
        }else if(value === 2){
            history.push("/series");
        }else if(value === 3){
            history.push("/favorite");
        }else if(value === 4){
            history.push("/search");
        }
    },[value, history]);
    return (
        <Box sx={{ width: 500}}>
            <BottomNavigation
                className={'root'}
                showLabels
                value={value}
                style={{backgroundColor: '#2d313a'}}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}

            >
                <BottomNavigationAction style={{color: "white"}} label="HomePage" icon={<WhatshotIcon />} />
                <BottomNavigationAction style={{color: "white"}} label="User" icon={<MovieIcon />} />
                <BottomNavigationAction style={{color: "white"}} label="TV Series" icon={<TvIcon />} />
                <BottomNavigationAction style={{color: "white"}} label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction style={{color: "white"}} label="Search" icon={<SearchIcon />} />

            </BottomNavigation>
        </Box>
    );
}