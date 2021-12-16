import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

function count(arr) {
    let sum = 0;
    let num = arr.length;
    if (num === 0){
        return 1
    }
    else{
        arr.forEach(function(item){
            sum += item
        })}
    return Math.round(sum/num);
}

export default function UserRating({comments, profile}) {
    const rating = comments.map(c => c['rating']);
    const average_rating = Number(count(rating));
    return (
        <>
            {average_rating &&  <Box
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
