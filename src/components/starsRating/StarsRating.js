import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

function count(arr) {
    let sum = 0;
    let num = arr.length;
    if (num === 0){
        return ''
    }
    else{
    arr.forEach(function(item){
        sum += item
    })}
    return Math.round(sum/num);
}
export default function StarsRating({id}) {
    const  [comments, setComments] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/api/v1/comments_apartment')
            .then(value => value.json())
            .then(value => setComments(value.data))

    },[])

    const filter = comments.filter(comments => comments.apartment === id).map(x=> x["rating"]);
    const rating = Number(count(filter));
    return (
            <>
                {rating &&  <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Typography component="legend">Rating</Typography>
                    <Rating name="customized-10" value={rating}  max={10} />
                </Box>}
            </>
    );
}