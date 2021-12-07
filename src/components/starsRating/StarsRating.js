import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function CustomizedRating({id}) {
    const  [comments, setComments] = useState([]);
    console.log(comments);
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/comments_apartment')
            .then(value => value.json())
            .then(value => setComments(value.data))

    },[])

    const filter = comments.filter(comments => comments.apartment === id);
// .filter(comments => comments.average_rating === Math.max(comments.average_rating))
    console.log(filter);
    return (

        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Typography component="legend">Rating</Typography>
            <Rating name="customized-5" defaultValue={5} max={5} />
        </Box>
    );
}