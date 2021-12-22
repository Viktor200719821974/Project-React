import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import {count} from "../../hook/count";


export default function UserRating({comments, profile}) {
    const [noRating, setNoRating] = useState(false);
    const rating = comments.map(c => c['rating']);
    const average_rating = count(rating);
    
    useEffect(() => {
        if(average_rating !== 0){
            setNoRating(true);
        }
    },[])
    return (
        <>
            {noRating &&  <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <Typography component="legend">Ваш рейтинг, {profile.name}</Typography>
                <Rating name="customized-10" value={average_rating}  max={10} />
            </Box>}
        </>
    );
}
