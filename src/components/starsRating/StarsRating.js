import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import {commentsApartmentServices} from "../../services/commentsApartment_services";
import {count} from "../../hook/count";

export default function StarsRating({id}) {
    const [comments, setComments] = useState([]);
    const [noRating, setNoRating] = useState(false);

    useEffect(() => {
        commentsApartmentServices().then(value => setComments(value.data));
    },[])

    const filter = comments.filter(comments => comments.apartment === id).map(x=> x["rating"]);
    const rating = count(filter);

    useEffect(() => {
        if(filter){
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
                    <Typography component="legend">Rating</Typography>
                    <Rating name="customized-10" value={rating}  max={10} />
                </Box>}
            </>
    );
}